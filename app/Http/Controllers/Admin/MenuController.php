<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Page;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::with(['items' => function($query) {
            $query->whereNull('parent_id')
                  ->orderBy('order')
                  ->with(['children' => function($q) {
                      $q->orderBy('order');
                  }]);
        }])->get();

        $pages = Page::select('id', 'title', 'slug')->get();
        $posts = Post::select('id', 'title', 'slug')->get();

        return Inertia::render('Admin/Menus/Index', [
            'menus' => $menus->map(function($menu) {
                return [
                    'id' => $menu->id,
                    'name' => $menu->name,
                    'location' => $menu->location,
                    'description' => $menu->description,
                    'is_active' => $menu->is_active,
                    'items' => $this->transformMenuItems($menu->items)
                ];
            }),
            'pages' => $pages,
            'posts' => $posts,
        ]);
    }

    protected function transformMenuItems($items)
    {
        return $items->map(function($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'url' => $item->url,
                'type' => $item->type,
                'target' => $item->target,
                'order' => $item->order,
                'children' => $this->transformMenuItems($item->children)
            ];
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $menu = Menu::create($validated);

        return redirect()->route('admin.menus.index')
            ->with('success', 'Menu created successfully.');
    }

    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $menu->update($validated);

        return redirect()->route('admin.menus.index')
            ->with('success', 'Menu updated successfully.');
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();

        return redirect()->route('admin.menus.index')
            ->with('success', 'Menu deleted successfully.');
    }

    public function storeMenuItem(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:menu_items,id',
            'type' => 'required|string|in:custom,page,post,home',
            'target' => 'nullable|string|in:_self,_blank',
            'order' => 'nullable|integer',
            'attributes' => 'nullable|array',
        ]);

        $validated['order'] = $menu->items()->max('order') + 1;

        $menuItem = $menu->items()->create($validated);

        return redirect()->route('admin.menus.index')
            ->with('success', 'Menu item added successfully.');
    }

    public function updateMenuItem(Request $request, MenuItem $menuItem)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'url' => 'sometimes|required|string|max:255',
            'parent_id' => 'sometimes|nullable|exists:menu_items,id',
            'type' => 'sometimes|required|string|in:custom,page,post,home',
            'target' => 'sometimes|nullable|string|in:_self,_blank',
            'order' => 'sometimes|nullable|integer',
            'attributes' => 'sometimes|nullable|array',
        ]);

        $menuItem->update($validated);

        return redirect()->route('admin.menus.index')
            ->with('success', 'Menu item updated successfully.');
    }

    public function destroyMenuItem(MenuItem $menuItem)
    {
        $menu = $menuItem->menu;
        $menuItem->delete();

        return redirect()->route('admin.menus.index')
            ->with('success', 'Menu item deleted successfully.');
    }

    public function reorderMenuItems(Request $request, Menu $menu)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:menu_items,id',
            'items.*.order' => 'required|integer',
            'items.*.parent_id' => 'nullable|exists:menu_items,id',
        ]);

        foreach ($request->items as $item) {
            $menu->items()->where('id', $item['id'])->update([
                'order' => $item['order'],
                'parent_id' => $item['parent_id'],
            ]);
        }

        return redirect()->back()
            ->with('success', 'Menu items reordered successfully.');
    }
}

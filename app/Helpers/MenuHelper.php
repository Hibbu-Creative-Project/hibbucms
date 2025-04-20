<?php

namespace App\Helpers;

use App\Models\Menu;

class MenuHelper
{
    public static function render(string $location)
    {
        $menu = Menu::where('location', $location)
            ->where('is_active', true)
            ->with(['items' => function ($query) {
                $query->whereNull('parent_id')
                    ->orderBy('order')
                    ->with('children');
            }])
            ->first();

        if (!$menu) {
            return null;
        }

        return static::renderItems($menu->items);
    }

    protected static function renderItems($items)
    {
        if ($items->isEmpty()) {
            return '';
        }

        $html = '<ul class="menu">';
        foreach ($items as $item) {
            $html .= static::renderItem($item);
        }
        $html .= '</ul>';

        return $html;
    }

    protected static function renderItem($item)
    {
        $hasChildren = $item->children->isNotEmpty();
        $target = $item->target === '_blank' ? ' target="_blank"' : '';

        $html = '<li class="menu-item' . ($hasChildren ? ' has-submenu' : '') . '">';
        $html .= '<a href="' . $item->url . '"' . $target . '>' . e($item->title) . '</a>';

        if ($hasChildren) {
            $html .= static::renderItems($item->children);
        }

        $html .= '</li>';

        return $html;
    }
}

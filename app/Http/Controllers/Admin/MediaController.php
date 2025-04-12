<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class MediaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view media')->only(['index', 'show']);
        $this->middleware('permission:create media')->only(['create', 'store']);
        $this->middleware('permission:edit media')->only(['edit', 'update']);
        $this->middleware('permission:delete media')->only('destroy');
    }

    public function index(Request $request)
    {
        $query = Media::with('user')->latest();

        // Filter by type
        if ($request->has('type')) {
            $query->where('mime_type', 'like', $request->type . '/%');
        }

        // Filter by search term
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $media = $query->paginate(24)->through(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'url' => $item->url,
                'mime_type' => $item->mime_type,
                'size' => $item->human_readable_size,
                'dimensions' => $item->dimensions,
                'created_at' => $item->created_at,
                'user' => $item->user ? [
                    'name' => $item->user->name,
                ] : null,
            ];
        });

        return Inertia::render('Media/Index', [
            'media' => $media,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'files.*' => 'required|file|max:10240', // Max 10MB per file
        ]);

        $uploadedMedia = [];

        foreach ($request->file('files') as $file) {
            // Debug log before upload
            Log::info('Uploading file:', [
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
            ]);

            $media = Media::upload($file)
                ->optimize();

            // Debug log after upload
            Log::info('Media created:', [
                'id' => $media->id,
                'name' => $media->name,
                'file_name' => $media->file_name,
                'mime_type' => $media->mime_type,
                'path' => $media->path,
                'url' => $media->url,
                'size' => $media->size,
                'user_id' => $media->user_id,
                'user' => $media->user,
            ]);

            $uploadedMedia[] = [
                'id' => $media->id,
                'name' => $media->name,
                'url' => $media->url,
                'mime_type' => $media->mime_type,
                'size' => $media->human_readable_size,
            ];
        }

        if ($request->wantsJson()) {
            return response()->json($uploadedMedia);
        }

        return back()->with('success', 'Media uploaded successfully.');
    }

    public function show($id)
    {
        $media = Media::with('user')->findOrFail($id);

        // Debug log
        Log::info('Media data:', [
            'id' => $media->id,
            'name' => $media->name,
            'file_name' => $media->file_name,
            'mime_type' => $media->mime_type,
            'path' => $media->path,
            'url' => $media->url,
            'size' => $media->size,
            'human_readable_size' => $media->human_readable_size,
            'user_id' => $media->user_id,
            'user' => $media->user,
            'created_at' => $media->created_at
        ]);

        if (!$media->user) {
            $media->update(['user_id' => auth()->id() ?? 1]);
            $media->load('user');
        }

        return Inertia::render('Media/Show', [
            'media' => [
                'id' => $media->id,
                'name' => $media->name ?: $media->file_name,
                'url' => $media->url,
                'mime_type' => $media->mime_type,
                'size' => $media->human_readable_size,
                'dimensions' => $media->dimensions,
                'created_at' => $media->created_at ? $media->created_at->format('Y-m-d H:i:s') : now()->format('Y-m-d H:i:s'),
                'user' => $media->user ? [
                    'name' => $media->user->name,
                ] : null,
            ],
        ]);
    }

    public function destroy($id)
    {
        $media = Media::findOrFail($id);
        $media->delete();

        return redirect()->route('media.index')
            ->with('message', 'Media deleted successfully.');
    }

    public function download($id)
    {
        $media = Media::findOrFail($id);
        return Storage::disk($media->disk)->download(
            $media->path,
            $media->name
        );
    }
}

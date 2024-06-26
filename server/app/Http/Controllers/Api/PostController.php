<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = Post::query()->with('user');
            $isAdmin = Auth::user()->status == 'admin';
            if (!$isAdmin) {
                $query->where('user_id', Auth::id());
            }

            // Добавление условия поиска, если передан параметр 'search'
            if ($request->filled('search')) {
                $searchTerm = $request->input('search');
                $query->where(function ($query) use ($searchTerm) {
                    $query->whereHas('user', function ($query) use ($searchTerm) {
                        $query->where('name', 'like', "%{$searchTerm}%")
                        ->orWhere('lastName', 'like', "%{$searchTerm}%")
                        ->orWhere('email', 'like', "%{$searchTerm}%");
                    })->orWhere('code', 'like', "%{$searchTerm}%")
                      ->orWhere('description', 'like', "%{$searchTerm}%");
                    // Добавьте другие условия поиска по необходимости
                });
            }

            if($request->filled('user_id') && $isAdmin) {
                $query->where('user_id', $request->input('user_id'));
            }

            $query->where(function ($query) {
                $query->where('issuedClient', false);
            });

            $posts = $query->paginate(10);

            // $posts = Post::paginate(10, ['*'], 'page', 2);

            // 10 - это количество постов на странице (можете изменить на необходимое количество),
            // ['*'] - выбирает все столбцы из таблицы posts (вы можете указать конкретные столбцы, если это необходимо),
            // 'page' - это имя параметра страницы в URL,
            // 2 - это номер страницы, которую вы хотите получить.

            //  Также, вы можете передавать параметр страницы через URL.
            //  Если у вас есть маршрут вроде /posts?page=2, Laravel автоматически возьмет номер страницы из URL. 
            //  В этом случае, вам не нужно указывать 'page' и 2 в paginate.


            return response()->json($posts);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }


 
    public function indexArchive (Request $request) {
        try {
            $query = Post::query()->with('user');
            $isAdmin = Auth::user()->status == 'admin';
            if (!$isAdmin) {
                $query->where('user_id', Auth::id());
            }

            // Добавление условия поиска, если передан параметр 'search'
            if ($request->filled('search')) {
                $searchTerm = $request->input('search');
                $query->where(function ($query) use ($searchTerm) {
                    $query->whereHas('user', function ($query) use ($searchTerm) {
                        $query->where('name', 'like', "%{$searchTerm}%")
                        ->orWhere('lastName', 'like', "%{$searchTerm}%")
                        ->orWhere('email', 'like', "%{$searchTerm}%");
                    })->orWhere('code', 'like', "%{$searchTerm}%")
                      ->orWhere('description', 'like', "%{$searchTerm}%");
                    // Добавьте другие условия поиска по необходимости
                });
            }

            if($request->filled('user_id') && $isAdmin) {
                $query->where('user_id', $request->input('user_id'));
            }


            $query->where('issuedClient', true);

            $posts = $query->paginate(10);

            return response()->json($posts);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'code' => 'required|unique:posts',
                'warehouse_id' => 'nullable|exists:warehouses,id',
                'warehouseChina' => 'nullable|boolean',
                'sentFrom' => 'nullable|boolean',
                'issuedClient' => 'nullable|boolean',
                'description' => 'nullable|string|max:255',
                'descriptionAdmin' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:255',
                'tel' => 'nullable|string|max:255',
                // Добавьте другие правила валидации
            ]);

            $userId = auth()->user()->id;
            $postCreate = $request->all();
            $postCreate['user_id'] = $userId;
            $post = Post::create($postCreate);

            $freshPost = $post->fresh();

            return response()->json(['data' => $freshPost]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $postId)
    {
        try {
            // Найти пост по идентификатору
            $post = Post::find($postId);

            // Проверить, существует ли пост
            if (!$post) {
                return response()->json(['message' => 'Пост не найден'], 404);
            }

            // Валидация данных из запроса
            $request->validate([
                'code' => 'required|string|unique:posts,code,' . $postId,
                'user_id' => 'required|exists:users,id',
                'warehouse_id' => 'nullable|exists:warehouses,id',
                'warehouseChina' => 'nullable|boolean',
                'sentFrom' => 'nullable|boolean',
                'issuedClient' => 'nullable|boolean',
                'description' => 'nullable|string',
                'descriptionAdmin' => 'nullable|string',
                'city' => 'nullable|string|max:255',
                'tel' => 'nullable|string|max:255',
                'is_warehouse' => 'nullable|boolean'
            ]);

            // Обновление данных поста
            $post->update($request->all());

            // Получение свежих данных после обновления
            $freshPost = $post->fresh();

            return response()->json(['message' => 'Пост успешно обновлен', 'data' => $freshPost]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $post = Post::find($id);

            if (!$post) {
                return response()->json(['message' => 'Пост не найден'], 404);
            }

            $post->delete();

            return response()->json(['message' => 'Пост успешно удален'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }
}

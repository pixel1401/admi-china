<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function loggedInUser()
    {
        try {
            $user = User::query()->findOrFail(auth()->user()->id);
            return response()->json(['user' => $user]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::query()->findOrFail($id);
            return response()->json(['user' => $user]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
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
    public function update(Request $request)
    {
        //
        try {

            $user = User::findOrFail(auth()->user()->id);

            $request->validate([
                // 'email' => 'required|unique:users', 
                'email' => 'required|email|unique:users,email,' . $user->id, // Уникальность email, исключая текущего пользователя
                'name' => 'required|string',
                'lastName' => 'required|string',
                'city' => 'required|string|max:255',
                'tel' => 'required|string|max:255',
                // Добавьте другие правила валидации
            ]);

            if ($user) {
                $user->update($request->all());
            }

            $freshUser = $user->fresh();

            return response()->json(['message' => 'Данные пользователя обновлены', 'data' => $freshUser]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    // GET USERS FOR DROPDOWN
    public function getUsersPost()
    {
        try {
            $usersWithIssuedClient = User::whereHas('post', function ($query) {
                $query->where('issuedClient', true);
            })->get();

            $usersWithoutIssuedClient = User::whereHas('post', function ($query) {
                $query->where('issuedClient', false);
            })->get();

            $responseData = [
                'archive' => $usersWithIssuedClient,
                'active' => $usersWithoutIssuedClient,
            ];

            return response()->json([ 'data' => $responseData]);

        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 400);
        }
    }


    public function changePassword(Request $request)
    {
        try {
            $request->validate([
                'password' => 'required|string|min:8|confirmed',
            ]);
    
            $user =  User::findOrFail(auth()->user()->id);
    
            if (!$user) {
                return response()->json(['error' => 'Пользователь не найден'], 401);
            }
    
            $user->password = Hash::make($request->password);
            $user->save();
    
            return response()->json(['message' => 'Пароль успешно изменен'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Произошла ошибка'], 400);
        }
        
    }
}

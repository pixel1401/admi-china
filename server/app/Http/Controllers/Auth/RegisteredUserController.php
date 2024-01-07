<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {   
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'lastName'=> ['string', 'max:255'],
                'tel' => ['string'],
            ]);
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'lastName' => $request->lastName ?? '',
                'tel' => $request->tel ?? NULL
            ]);
    
            event(new Registered($user));
    
            Auth::login($user);
    
            return response()->json(['success'=> 'ok'], 204);
        } catch (\Throwable $th) {
            return response()->json(['error'=> $th->getMessage()], 400);
        }

        
    }
}

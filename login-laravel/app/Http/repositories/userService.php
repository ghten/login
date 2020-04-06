<?php

namespace App\Http\Repositories;


use \App\User;

class userService {
    
    public function getUser($id) {
        return User::find($id);
    }
}

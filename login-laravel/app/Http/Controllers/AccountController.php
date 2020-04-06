<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Http\Repositories\userService;

use Auth;

class AccountController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }
    
    public function index(){
 
        $userservice = new userService();
                
        return $userservice->getUser(Auth::user()->id);
    }
}    

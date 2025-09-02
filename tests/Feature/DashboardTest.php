<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.dashboard', absolute: false))->assertRedirect(route('login', absolute: false));
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('admin.dashboard', absolute: false))->assertOk();
});
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class StartWsServer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'server:start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command start WebSocket server and Queue Laravel';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        exec('php artisan queu:listen 2>&1', $output);
        exec('/home/flancy/.nvm/versions/node/v6.2.2/bin/node /var/www/laravel/ws.server/server.js 2>&1', $output);
        $this->info('All command started');
        $this->info($output);
    }
}

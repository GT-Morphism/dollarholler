<div class="grid min-h-screen grid-cols-12 gap-x-16 bg-whisper">
	<header class="col-span-3 bg-daisyBush text-center">
		<div>
			<a href="/invoices"
				><img src="/images/dollarholler.svg" alt="The Dollar Holler" class="mx-auto" /></a
			>
		</div>

		<nav>
			<ul class="list-none text-2xl font-bold">
				<li class="mb-6">
					<a class="font-bold text-white hover:text-goldenFizz" href="/invoices">Invoices</a>
				</li>
				<li class="mb-6">
					<a class="font-bold text-white hover:text-goldenFizz" href="/clients">Clients</a>
				</li>
				<li class="mb-6">
					<a class="font-bold text-white hover:text-goldenFizz" href="#">Settings</a>
				</li>
				<li class="mb-6">
					<a class="font-bold text-white hover:text-goldenFizz" href="#">Logout</a>
				</li>
			</ul>
		</nav>
	</header>

	<main class="col-span-8 pt-10">
		<slot />
	</main>
</div>

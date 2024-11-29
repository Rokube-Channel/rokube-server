const LoginPage = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rokube Auth Success</title>
    <link rel="icon" type="image/x-icon" href="/images/favicon.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="/js/tailwind.config.js"></script>
</head>

<body class="bg-color-bg text-color-text text-xl p-10">
    <div class="container mx-auto flex flex-col gap-28">

        <div class="flex flex-row justify-center items-center h-32 relative">
            <img class="h-full w-full object-contain" src="/images/rokube.png" />
        </div>

        <div class="capitalize text-center flex flex-col gap-5">
            <h1 class="font-bold text-5xl">Congratulations!</h1>
            <p class="text-5xl">You have successfully authenticated.</p> 
            <p class="text-3xl">Thank you for your patience and cooperation. Please wait a moment while your device logs in.</p> 
            <p class="text-4xl">Enjoy your experience!</p>
        </div>

        <!-- <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Donation:</h2>
            <p>If you want to support my developments you are welcome to buy me a cup of coffee :)</p>
            <ul class="ml-10 list-disc">
                <li>Patreon</li>
            </ul>
        </div> -->

        <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Found an error or have a suggestion?:</h2>
            <p>
                We'd love to hear from you! You can let us know on the issue tracker on GitHub.
            </p>
        </div>

    </div>
</body>

</html>
`

module.exports = LoginPage
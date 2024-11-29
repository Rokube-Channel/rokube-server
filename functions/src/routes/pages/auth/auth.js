const AuthPage = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rokube Authenticator</title>
    <link rel="icon" type="image/x-icon" href="/public/images/favicon.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="/public/js/tailwind.config.js"></script>
    <script src="/public/js/auth.js"></script>
</head>

<body class="bg-color-bg text-color-text text-xl p-10">
    <div class="container mx-auto flex flex-col gap-28">

        <div class="flex flex-row justify-center items-center h-32 relative">
            <img class="h-full w-full object-contain" src="/public/images/rokube.png" />
        </div>

        <form id="form" class="capitalize flex flex-col gap-5" method="get">
            <h2 class="text-4xl font-semibold">Type the code displayed on your TV.</h2>
            <div id="error-message" class="text-red-500 mt-4"></div>
            <input class="p-5 text-3xl text-center text-black font-bold" type="text" id="code" name="code" minlength="8" maxlength="8" size="8" autofocus="autofocus" required="true" autocomplete="ÑÖcompletes">
            <input class="text-center bg-color-primary p-3 hover:bg-color-secondary" type="submit" id="submit" value="Activate">
        </form>

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

module.exports = AuthPage
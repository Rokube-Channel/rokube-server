const HomePage = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rokube (Official)</title>
    <link rel="icon" type="image/x-icon" href="/public/images/favicon.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="/public/js/tailwind.config.js"></script>
    <script src="/public/js/home.js"></script>
</head>

<body class="bg-color-bg text-color-text text-xl p-10">
    <div class="container mx-auto flex flex-col gap-24">
        
        <div class="flex flex-row justify-center items-center h-32 relative">
            <img class="h-full w-full object-contain" src="/public/images/rokube.png" />
        </div>
        
        <div>
            <h1 class="capitalize font-bold text-center text-5xl">An simple player for roku devices, free and open source</h1>
        </div>

        <div class="flex flex-row gap-5 h-52 sm:h-96 relative">

            <div class="w-0 sm:w-1/4">
                <img class="object-contain h-full w-full" src="/public/images/roku_remote.png" alt="roku remote" />
            </div>

            <div class="flex-1 relative">

                <div id="images">
                    <img src="/public/images/rokube_screenshot_01.jpg" alt="Rokube screen" class="object-contain h-full w-full block" />
                    <img src="/public/images/rokube_screenshot_02.jpg" alt="Rokube screen" class="object-contain h-full w-full hidden" />
                    <img src="/public/images/rokube_screenshot_03.jpg" alt="Rokube screen" class="object-contain h-full w-full hidden" />
                    <img src="/public/images/rokube_screenshot_04.jpg" alt="Rokube screen" class="object-contain h-full w-full hidden" />
                    <img src="/public/images/rokube_screenshot_05.jpg" alt="Rokube screen" class="object-contain h-full w-full hidden" />
                </div>

                <a id="prev"
                    class="absolute select-none w-10 h-10 flex flex-row justify-center items-center top-1/2 -translate-y-1/2 left-0 rounded-full bg-color-primary hover:bg-color-secondary">
                    ❮
                </a>
                <a id="next"
                    class="absolute select-none w-10 h-10 flex flex-row justify-center items-center top-1/2 -translate-y-1/2 right-0 rounded-full bg-color-primary hover:bg-color-secondary">
                    ❯
                </a>

                <div class="absolute select-none flex flex-row gap-5 bottom-0 left-1/2 -translate-x-1/2">
                    <span class="w-5 h-5 rounded-full bg-white hover:bg-color-secondary" data-index="1"></span>
                    <span class="w-5 h-5 rounded-full bg-color-primary hover:bg-color-secondary" data-index="2"></span>
                    <span class="w-5 h-5 rounded-full bg-color-primary hover:bg-color-secondary" data-index="3"></span>
                    <span class="w-5 h-5 rounded-full bg-color-primary hover:bg-color-secondary" data-index="4"></span>
                    <span class="w-5 h-5 rounded-full bg-color-primary hover:bg-color-secondary" data-index="5"></span>
                </div>

            </div>
        </div>

        <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Features:</h2>
            <ul class="ml-10 list-disc">
                <li>No Ads</li>
                <li>Designed for roku devices</li>
                <li>Login into your account</li>
                <li>Support roku remote controller</li>
                <li>Open source</li>
            </ul>
        </div>

        <!-- <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Downloader codes:</h2>
            <ul class="ml-10 list-disc">
                <li>Beta release: 79015</li>
            </ul>
        </div>

        <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Donation:</h2>
            <p>If you want to support my developments you are welcome to buy me a cup of coffee :)</p>
            <ul class="ml-10 list-disc">
                <li>Patreon</li>
            </ul>
        </div>

        <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Sources:</h2>
            <ul class="ml-10 list-disc">
                <li>Rokube Channel</li>
                <li>Rokube Sever</li>
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
module.exports = HomePage
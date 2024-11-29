const HowGetAPICredentialsPage = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rokube How Get API Credentials</title>
    <link rel="icon" type="image/x-icon" href="/images/favicon.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="/js/tailwind.config.js"></script>
    <script src="/js/home.js"></script>
</head>

<body class="bg-color-bg text-color-text text-xl p-10">
    <div class="container mx-auto flex flex-col gap-24">
        
        <div class="flex flex-row justify-center items-center h-32 relative">
            <img class="h-full w-full object-contain" src="/images/rokube.png" />
        </div>
        
        <div>
            <h1 class="capitalize font-bold text-center text-5xl">How to Obtain Google API Credentials for YouTube</h1>
        </div>

        <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Create a Project in Google Cloud Console:</h2>
            <ul class="ml-10 list-disc">
                <li>
                    Go to Google <a class="underline-offset-2 text-color-secondary hover:opacity-80" href="https://console.cloud.google.com/">Cloud Console</a>
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/1-GoToGoogleCloudConsole.png" />
                    </div>
                </li>
                <li>
                    Sign in with your Google account.
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/2-SignInWithYourGoogleAccount.png" />
                    </div>
                </li>
                <li>
                    Click on Console
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/3-ClickOnConsole.png" />
                    </div>
                </li>
                <li>
                    Click on the "Select a project" at the top and select "New Project".
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/4-ClickOnSelectAProyect.png" />
                    </div>
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/5-SelectNewProyect.png" />
                    </div>
                </li>
                <li>
                    Give your project a name and click "Create".
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/6-GiveYourProjectAName.png" />
                    </div>
                </li>
            </ul>
        </div>

        <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Enable the YouTube Data API:</h2>
            <ul class="ml-10 list-disc">
                <li>
                    Select "APIs & Services" and then "Library".
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/7-SelectAPIs&Services.png" />
                    </div>
                    <br />
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/8-GoToLibrary.png" />
                    </div>
                </li>
                <li>
                    Search for "YouTube Data API v3" and click on it.
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/9-SearchYouTubeDataAPIv3_1.png" />
                    </div>
                    <br />
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/10-SearchYouTubeDataAPIv3_2.png" />
                    </div>
                </li>
                <li>
                    Click "Enable" to activate the API for your project.
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/11-ClickEnableYoutubeDataAPIv3.png" />
                    </div>
                </li>
            </ul>
        </div>

        <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Setting Up the OAuth Consent Screen:</h2>
            <ul class="ml-10 list-disc">
                <li>
                    Select "OAuth consent screen".
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/12-OAuthConsentScreen.png" />
                    </div>
                </li>
                <li>
                    Configure Application Information.
                    <ul class="ml-10 list-disc">
                        <li>Enter the name of your application as you want it to appear on the consent screen.</li>
                        <li>Application Logo: Upload a logo for your application (optional but recommended).</li>
                        <li>Support Email: Provide an email address where users can contact you for support.</li>
                    </ul>
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/13-OAuthConsentScreenEdit_1.png" />
                    </div>
                </li>
                <li>
                    Define Authorization Scopes.
                    <br>
                    These default scopes are usually sufficient for applications that only need to identify the user and do not require access to more sensitive data
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/14-OAuthConsentScreenEdit_2.png" />
                    </div>
                </li>
                <li>
                    Add All Users You Typically Use.
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/15-OAuthConsentScreenEdit_3.png" />
                    </div>
                </li>
                <li>
                    Save and back to panel.
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/16-OAuthConsentScreenEdit_4.png" />
                    </div>
                </li>
            </ul>
        </div>

        <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Create Credentials:</h2>
            <ul class="ml-10 list-disc">
                <li>
                    Select "Credentials".
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/17-GoToCredentials.png" />
                    </div>
                </li>
                <li>
                    Click on "Create Credentials" and select "OAuth Client ID".
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/18-GoToOAuthID.png" />
                    </div>
                </li>
                <li>
                    Click on "Create Credentials" and select "OAuth Client ID".
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/18-GoToOAuthID.png" />
                    </div>
                </li>
                <li>
                    Create OAuth Client ID.
                    <ul class="ml-10 list-disc">
                        <li>Select Application Type as "Desktop app".</li>
                        <li>And you can then give the credential any name you prefer..</li>
                    </ul>
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/19-CreateOAuthCredentials.png" />
                    </div>
                </li>
            </ul>
        </div>

        <div class="capitalize flex flex-col gap-5">
            <h2 class="text-4xl font-semibold">Final Steps to Configure User Authentication:</h2>
            <ul class="ml-10 list-disc">
                <li>
                    In "APIs & Services" > "Credentials", select your "OAuth Client ID"
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/20-SelectOAuth2.0ClientIDs.png" />
                    </div>
                </li>
                <li>
                    In the additional information section, you will see the "Customer ID" and "Client Secret". Copy these details to your Rokube channel.
                    <div class="flex flex-row justify-center items-center h-32 relative">
                        <img class="h-full w-full object-contain" src="/images/howgetapicredentials/21-CopyCredentials.png" />
                    </div>
                </li>
                <li>
                    With these steps, you have completed the configuration for user authentication.
                </li>
            </ul>
        </div>

    </div>
</body>

</html>
`

module.exports = HowGetAPICredentialsPage
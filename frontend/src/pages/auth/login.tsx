import { useMsal } from "@azure/msal-react";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

import { IPublicClientApplication } from "@azure/msal-browser";

// type loginType = "LOADING" | "ERROR" | "SUCCESS" | null;

function signInClickHandler(instance: IPublicClientApplication) {
  instance.loginRedirect();
}

export function Login() {
  const { instance } = useMsal();

  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                ¡Hola de Nuevo!
              </h1>
              <p className="text-muted-foreground text-sm">
                Por favor ingresa tus credenciales
              </p>
            </div>
            <Button
              variant="outline"
              type="button"
              // disabled={isLoading}
              onClick={() => signInClickHandler(instance)}
            >
              {/* {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )} */}
              <Icons.microsoft className="mr-2 h-4 w-4" />
              Microsoft
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
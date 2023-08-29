import { IUser } from '../../user/infrastructure/user.interface'

// TODO: Create template with html or hbs file
export const MailTemplatePasswordResetSuccess = (user: IUser): string => {
  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password ResetSuccess</title>

        <style></style>
      </head>

      <body>
        <header>
          <div class="header_email"></div>
        </header>

        <main>
          <div class="content">
            <h2>Halo, ${user.name}</h2>
            <p>Your Password Reset Success</p>
            <div>
              You can login again with new password
            </div>
          </div>
        </main>

        <footer></footer>
      </body>
    </html>
    `
}

const { google } = require("googleapis");

const credential = JSON.parse(
  Buffer.from(
    process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS,
    "base64"
  ).toString()
);

const { GoogleAuth } = require("google-auth-library");
const auth = new GoogleAuth({
  credentials: credential,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function updateGoogleSheet(authClient, data) {
  const sheetsService = google.sheets({ version: "v4", auth: authClient });
  const values = [
    [
      data.name,
      data.confirmare,
      data.persoane,
      data.meniu,
      data.cazare,
      data.mentiuni,
    ],
  ];
  await sheetsService.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: "Foaie1",
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

exports.handler = async (event) => {
  try {
    const formData = event.body;
    const parsedData = JSON.parse(formData);

    const authClient = await auth.getClient();

    await updateGoogleSheet(authClient, parsedData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Comanda a fost trimisă cu succes!" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Eroare de server. Vă rugăm incercați mai tarziu!",
      }),
    };
  }
};

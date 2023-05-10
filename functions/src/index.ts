import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

export const addSubscription = functions.https.onRequest(
  async (request, response) => {
    if (request.method === "POST") {
      // Get the name of the new subscription service from the request body
      const { name, description, cost, billingCycle, userId } = request.body;

      // Create a new subscription service in the database
      const subscriptionServiceRef = admin
        .database()
        .ref("subscriptionServices")
        .push();
      await subscriptionServiceRef.set({
        name,
        description,
        cost,
        billingCycle,
        userId,
        createdAt: admin.database.ServerValue.TIMESTAMP,
      });

      response.status(200).json({ created: "ok" });
    } else {
      response.status(400).json("Invalid request method");
    }
  }
);

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
export const addSubscriptionServices = functions.https.onCall(
  async (data, context) => {
    // Check if the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The user must be authenticated."
      );
    }

    // Get the name of the new subscription service from the request body
    const { name, description, cost, billingPeriod } = data;

    // Create a new subscription service in the database
    const subscriptionServiceRef = admin
      .database()
      .ref("subscriptionServices")
      .push();
    await subscriptionServiceRef.set({
      name,
      description,
      cost,
      billingPeriod,
      userId: context.auth.uid,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });

    return { success: true };
  }
);

export const getSubscriptionServices = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User not authenticated."
      );
    }

    const userId = context.auth.uid;
    const subscriptionServicesRef = admin
      .database()
      .ref("subscriptionServices");
    const snapshot = await subscriptionServicesRef
      .orderByChild("userId")
      .equalTo(userId)
      .once("value");
    const subscriptionServices = snapshot.val();
    return subscriptionServices;
  }
);

export const deleteSubscriptionService = functions.https.onCall(
  async (data, context) => {
    // Check if user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be signed in to delete a subscription service."
      );
    }

    // Get the subscription service ID from the request data
    const subscriptionServiceId = data.subscriptionServiceId;

    try {
      // Check if the user is the owner of the subscription service
      const subscriptionServiceSnapshot = await admin
        .database()
        .ref(`subscriptionServices/${subscriptionServiceId}`)
        .once("value");
      const subscriptionService = subscriptionServiceSnapshot.val();
      if (subscriptionService.userId !== context.auth.uid) {
        throw new functions.https.HttpsError(
          "permission-denied",
          "You do not have permission to delete this subscription service."
        );
      }

      // Delete the subscription service
      await admin
        .database()
        .ref(`subscriptionServices/${subscriptionServiceId}`)
        .remove();

      return {
        id: subscriptionServiceId,
        message: `Subscription service ${subscriptionServiceId} successfully deleted.`,
      };
    } catch (error) {
      console.error(error);
      throw new functions.https.HttpsError(
        "internal",
        "An error occurred while deleting the subscription service."
      );
    }
  }
);

export const getCostBreakdown = functions.https.onCall(
  async (data, context) => {
    // Check if user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authenticated"
      );
    }

    try {
      const subscriptionServicesSnapshot = await admin
        .database()
        .ref("subscriptionServices")
        .orderByChild("userId")
        .equalTo(context.auth.uid)
        .once("value");
      const subscriptionServices = subscriptionServicesSnapshot.val();

      let totalMonthlyCost = 0;
      let totalYearlyCost = 0;

      for (const key in subscriptionServices) {
        if (subscriptionServices.hasOwnProperty(key)) {
          const { cost, billingPeriod } = subscriptionServices[key];

          // Check if the billing period is monthly or yearly
          if (billingPeriod === "monthly") {
            totalMonthlyCost += cost;
            totalYearlyCost += cost * 12;
          } else if (billingPeriod === "yearly") {
            totalMonthlyCost += cost / 12;
            totalYearlyCost += cost;
          }
        }
      }

      return { totalMonthlyCost, totalYearlyCost };
    } catch (error) {
      console.error(error);
      throw new functions.https.HttpsError(
        "internal",
        "Error calculating cost breakdown"
      );
    }
  }
);

export const postSubscriptionServiceReview = functions.https.onCall(
  async (data, context) => {
    // Check if user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authenticated"
      );
    }

    // Get the subscription service ID and review text from the request data
    const { subscriptionServiceId, review, rating } = data;

    try {
      // Get the subscription service from the database
      const subscriptionServiceSnapshot = await admin
        .database()
        .ref(`subscriptionServices/${subscriptionServiceId}`)
        .once("value");
      const subscriptionService = subscriptionServiceSnapshot.val();

      // Check if the subscription service exists
      if (!subscriptionService) {
        throw new functions.https.HttpsError(
          "not-found",
          "Subscription service not found"
        );
      }

      // Save the review to the database
      const reviewRef = admin.database().ref("reviews").push();
      await reviewRef.set({
        subscriptionServiceId,
        userId: context.auth.uid,
        postedBy: context.auth.token.name,
        review,
        rating,
        createdAt: admin.database.ServerValue.TIMESTAMP,
      });

      return { success: true };
    } catch (error) {
      console.error(error);
      throw new functions.https.HttpsError("internal", "Error posting review");
    }
  }
);
export const getSubscriptionServiceReviews = functions.https.onCall(
  async (data, context) => {
    try {
      // Get all subscription services
      const subscriptionServicesSnapshot = await admin
        .database()
        .ref("subscriptionServices")
        .once("value");
      const subscriptionServices = subscriptionServicesSnapshot.val();

      // Get all reviews for all subscription services, ordered by createdAt from newest to oldest
      const reviewsSnapshot = await admin
        .database()
        .ref("reviews")
        .orderByChild("createdAt")
        .once("value");
      const reviews = reviewsSnapshot.val();

      // Add subscription service name to each review object
      for (const reviewId in reviews) {
        if (reviews.hasOwnProperty(reviewId)) {
          const review = reviews[reviewId];
          const subscriptionServiceId = review.subscriptionServiceId;
          if (subscriptionServices.hasOwnProperty(subscriptionServiceId)) {
            review.subscriptionServiceName =
              subscriptionServices[subscriptionServiceId].name;
          }
        }
      }

      // Return the reviews
      return reviews;
    } catch (error) {
      console.error(error);
      throw new functions.https.HttpsError(
        "internal",
        "Error getting subscription service reviews"
      );
    }
  }
);

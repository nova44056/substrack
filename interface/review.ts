export interface IReview {
  id: string;
  rating: number;
  review: string;
  subscriptionServiceId: string;
  subscriptionServiceName: string;
  userId: string;
  createdAt: number;
  postedBy: string;
}

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import reviewerIcon1 from '/assets/images/girl-wear-vr.png';
import reviewerIcon2 from '/assets/images/girl-wear-vr.png';
import reviewerIcon3 from '/assets/images/girl-wear-vr.png';
const reviews = [
  {
    name: "John Doe",
    review:
      "Happy Cart has the best products! The quality and prices are unmatched.",
    stars: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    icon: reviewerIcon1,
  },
  {
    name: "Jane Smith",
    review: "Amazing customer service and fast delivery. Highly recommend!",
    stars: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </>
    ),
    icon: reviewerIcon2,
  },
  {
    name: "Mark Wilson",
    review: "Great experience! I love shopping at Happy Cart.",
    stars: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStar />
      </>
    ),
    icon: reviewerIcon3,
  },
];
export default reviews;

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FeedBackAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { RiThumbDownFill, RiThumbDownLine, RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";

const LikeDisLike = ({ qna, refetch }) => {
  const [likeUnLike, setLikeUnLike] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [unLikeCount, setUnLikeCount] = useState(0);
  const isLogin = Cookies.get("uat_multikart");
  const { mutate, isLoading } = useCreate(FeedBackAPI, false, false, "No", (resDta) => { refetch(); });
  useEffect(() => {
    setLikeUnLike(qna?.reaction);
    setLikeCount(qna?.total_likes);
    setUnLikeCount(qna?.total_dislikes);
  }, []);

  const feedBack = (value) => {
    if (isLogin) {
      if (value === "liked") {
        if (likeUnLike === "liked") {
          setLikeCount((prev) => prev - 1);
          setLikeUnLike("");
          mutate({ question_and_answer_id: qna.id, reaction: null });
        } else if (likeUnLike === "disliked") {
          setLikeCount((prev) => prev + 1);
          setUnLikeCount((prev) => prev - 1);
          setLikeUnLike("liked");
          mutate({ question_and_answer_id: qna.id, reaction: "liked" });
        } else {
          setLikeCount((prev) => prev + 1);
          setLikeUnLike("liked");
          mutate({ question_and_answer_id: qna.id, reaction: "liked" });
        }
      } else if (value === "disliked") {
        if (likeUnLike === "disliked") {
          setUnLikeCount((prev) => prev - 1);
          setLikeUnLike("");
          mutate({ question_and_answer_id: qna.id, reaction: null });
        } else if (likeUnLike === "liked") {
          setUnLikeCount((prev) => prev + 1);
          setLikeCount((prev) => prev - 1);
          setLikeUnLike("disliked");
          mutate({ question_and_answer_id: qna.id, reaction: "disliked" });
        } else {
          setUnLikeCount((prev) => prev + 1);
          setLikeUnLike("disliked");
          mutate({ question_and_answer_id: qna.id, reaction: "disliked" });
        }
      }
    }
  };
  return (
    <>
      {qna?.answer ? (
        <li>
          <a onClick={() => !isLoading && feedBack("liked")}>
            <span>
              {isLogin ? likeUnLike == "liked" ? <RiThumbUpFill className="theme-color" /> : <RiThumbUpLine /> : <RiThumbUpFill />} {likeCount}
            </span>
          </a>
        </li>
      ) : null}
      {qna?.answer ? (
        <li>
          <a onClick={() => !isLoading && feedBack("disliked")}>
            <span>
              {isLogin ? likeUnLike == "disliked" ? <RiThumbDownFill className="theme-color" /> : <RiThumbDownLine /> : <RiThumbDownFill />} {unLikeCount}
            </span>
          </a>
        </li>
      ) : null}
    </>
  );
};

export default LikeDisLike;
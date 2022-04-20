import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.css";
import { getTimestamp } from "../../utils";
import {
  LIKE_NEWS,
  FETCH_SINGLE_NEWS_DATA,
  DISLIKE_NEWS,
  DELETE_NEWS,
  FETCH_NEWS_LIST,
} from "../../graphApis";

const ShowNews = () => {
  const params = useParams();
  const navigate = useNavigate();
  const variables = { uuid: params.id };
  const [likeNews] = useMutation(LIKE_NEWS);
  const [dislikeNews] = useMutation(DISLIKE_NEWS);
  const [deleteNews] = useMutation(DELETE_NEWS);
  const { loading, error, data } = useQuery(FETCH_SINGLE_NEWS_DATA, {
    variables,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error while fetching news.</p>;

  const { title, author, date, likes, text } = data.singleNews;

  const likeDislikeUpdater = (field) => (cache, { data }) => {
    const newsItems = cache.readQuery({
      query: FETCH_SINGLE_NEWS_DATA,
      variables,
    });

    cache.writeQuery({
      query: FETCH_SINGLE_NEWS_DATA,
      variables,
      data: {
        singleNews: {
          ...newsItems.singleNews,
          likes: data[field]['likes'],
        },
      },
    });

    const allNews = cache.readQuery({ query: FETCH_NEWS_LIST });
    const updatedNews = allNews.news.map(n => n.uuid === variables.uuid ? {...n, likes: data[field]['likes'] } : n);

    cache.writeQuery({
      query: FETCH_NEWS_LIST,
      variables,
      data: {
        news: updatedNews
      },
    });
  };

  const likeNewsHandler = () => {
    likeNews({
      variables,
      update: likeDislikeUpdater('like')
    });
  };

  const dislikeNewsHandler = () => {
    dislikeNews({
      variables,
      update: likeDislikeUpdater('dislike')
    });
  };

  const deleteNewsHeandler = () => {
    deleteNews({
      variables,
      update: (cache, { data: { delete: news } }) => {
        cache.writeQuery({
          query: FETCH_NEWS_LIST,
          data: {
            news
          },
        });
      },
    });
    // Navigate to Home page
    navigate("/");
  };

  return (
    <div className="showCardContent">
      <h3 className="showCardTitle">{title}</h3>
      <p>{text}</p>
      <div className="rightFloatTxt">
        <strong>- {author}</strong>
      </div>
      <div className="showPageFooter">
        <strong>{likes.toString()} likes</strong>
        <strong>{getTimestamp(date)}</strong>
      </div>
      <div className="buttonsContainer">
        <button onClick={likeNewsHandler}>Like</button>
        <button onClick={dislikeNewsHandler}>Dislike</button>
        <button onClick={deleteNewsHeandler}>Delete</button>
      </div>
    </div>
  );
};

ShowNews.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  likes: PropTypes.number,
};

export default ShowNews;

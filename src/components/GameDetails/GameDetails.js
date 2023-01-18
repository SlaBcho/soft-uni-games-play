/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const GameDetails = ({
    games,
    addComment
}) => {
    const {user} = useContext(AuthContext);
    const { gameId } = useParams();
    
    const [comment, setComment] = useState({
        username: '',
        comment: ''
    });

    const [error, setError] = useState({
        username: '',
        comment: ''
    });

    const game = games.find(el => el._id === gameId);
    const isOwner = game._ownerId === user._id;

    const addCommentHandler = (e) => {
        e.preventDefault();
        addComment(gameId, `${comment.username}: ${comment.comment}`);
    };

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const validateUsername = (e) => {
        const username = e.target.value;
        let errorMessage = '';

        if (username.length < 4) {
            errorMessage = 'username must be longer than 4 characters!';
        } else if (username.length > 10) {
            errorMessage = 'username must be shorter than 10 characters!';
        }

        setError(state => ({
            ...state,
            username: errorMessage
        }));
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">{game.summary}</p>
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments?.map(x =>
                            <li className="comment">
                                <p>{x}</p>
                            </li>)}
                    </ul>
                    {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </div> 
                {isOwner ? <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">
                        Edit
                    </Link>
                    <a href="/#" className="button">
                        Delete
                    </a>
                </div>
                : null}
                
            </div>
            
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        name="username"
                        type="text"
                        placeholder="John Doe"
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />
                    {error.username &&
                    <div style={{color: 'red'}}>{error.username}</div>
                    }    
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};

export default GameDetails;
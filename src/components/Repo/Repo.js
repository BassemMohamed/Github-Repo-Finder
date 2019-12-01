import React from "react";
import styled from "styled-components";
import icons from "../../Assets/Icons";

const Card = styled.div`
  padding: 0.75rem;
  text-align: left;
  position: relative;
  border: 1px solid #555;
  border-radius: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  img {
    width: 2.5rem;
    height: auto;
    border-radius: 50%;
  }
  h4 {
    cursor: pointer;
    margin-top: 0;
  }
`;

const CardContent = styled.div`
  p {
    margin: 0;
  }
  > div:nth-child(2) {
    position: absolute;
    right: 0.8rem;
    bottom: 0.8rem;

    span {
      margin: 0 0.1rem;
      svg {
        margin: 0 2px -3px 2px;
      }
    }
  }
`;

const CardControl = styled.div`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  cursor: pointer;
`;

export default ({
  repo: { id, name, url, description, owner, forkCount, watchers, stargazers },
  onDelete
}) => (
  <Card>
    <h4 onClick={() => window.open(url)}>{name}</h4>
    <p>{description}</p>
    <CardContent>
      <div>
        <img src={owner.avatarUrl} alt={owner.login}></img>
        <p>{owner.login}</p>
      </div>
      <div>
        <p>
          <span>
            {icons.forks}({forkCount})
          </span>
          <span>
            {icons.watchers}({watchers.totalCount})
          </span>
          <span>
            {icons.stars}({stargazers.totalCount})
          </span>
        </p>
      </div>
    </CardContent>
    <CardControl>
      <span onClick={() => onDelete(id)}>{icons.trashcan}</span>
    </CardControl>
  </Card>
);

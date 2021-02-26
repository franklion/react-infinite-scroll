import React, { useEffect, useState } from 'react';
import useAsync from './hooks/useAsync';
import useSkipFirstMount from './hooks/useSkipFirstMount';
import useIntersection from './hooks/useIntersection';
import { fetchReposAsync } from './api/repo';
import iconLion from './static/lion.png';
import cons from './constant';
import { StyledContainer, StyledTitle, StyledIcon, StyledCard, StyledLink, StyledTarget } from './styles/styled';

const App = () => {
  const [params, setParams] = useState(cons.INIT_PARAMS);
  const [repos, setRepos] = useState([]);
  const { execute, response, error } = useAsync(fetchReposAsync, {
    immediate: true,
    initParams: params
  });
  const [refObserver, refContainer, refTarget] = useIntersection({
    update: function () {
      setParams((prevParams) => ({ ...prevParams, pageNum: prevParams.pageNum + 1 }));
    }
  });

  useSkipFirstMount(() => {
    if (params) {
      setTimeout(() => {
        execute(params);
      }, 1000);
    }
  }, [params]);

  useEffect(() => {
    if (response && response?.data.length > 0) {
      setRepos((prevRepos) => [...prevRepos, ...response?.data]);
    } else if (response && response?.data.length === 0) {
      refObserver.current.disconnect();
      refTarget.current.remove();
    }
  }, [response, refObserver, refTarget]);

  useEffect(() => {
    if (error) {
      console.log('API 請求到達上限，請稍候再試！');
      refObserver.current.disconnect();
      refTarget.current.remove();
    }
  }, [error, refObserver, refTarget]);

  return (
    <StyledContainer rel={refContainer}>
      <StyledTitle>
        <StyledIcon src={iconLion} alt="lion" />
        {cons.INIT_PARAMS.user} repo list:
      </StyledTitle>

      {repos.map((repo) => (
        <StyledCard key={repo.id}>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <StyledLink href={repo.html_url} rel="noreferrer" target="_blank">
            {repo.html_url}
          </StyledLink>
        </StyledCard>
      ))}

      <StyledTarget ref={refTarget} />
    </StyledContainer>
  );
};

export default App;

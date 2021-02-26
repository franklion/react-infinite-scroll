import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useAsync from './hooks/useAsync';
import useSkipFirstMount from './hooks/useSkipFirstMount';
import { fetchReposAsync } from './api/repo';
import iconLion from './static/lion.png';
import cons from './constant';
import {
  StyledContainer,
  StyledTitle,
  StyledIcon,
  StyledCard,
  StyledLink,
  StyleLoadingObserver
} from './styles/styled';

const App = () => {
  const refObserver = useRef(null);
  const refContainer = useRef(null);
  const refLoadingObserver = useRef(null);
  const [params, setParams] = useState(cons.INIT_PARAMS);
  const [repos, setRepos] = useState([]);

  const { isLoading, execute, response, error } = useAsync(fetchReposAsync, {
    immediate: true,
    initParams: params
  });

  useEffect(() => {
    const options = {
      root: refContainer.current,
      rootMargin: '0px 0px 200px 0px',
      threshold: 0
    };

    const callback = ([entry]) => {
      if (entry && entry.isIntersecting) {
        setParams((prevParams) => ({ ...prevParams, pageNum: prevParams.pageNum + 1 }));
      }
    };

    refObserver.current = new IntersectionObserver(callback, options);
    refObserver.current.observe(refLoadingObserver.current);
  }, []);

  useSkipFirstMount(() => {
    if (params) {
      execute(params);
    }
  }, [params]);

  useEffect(() => {
    if (response && response?.data.length > 0) {
      setRepos((prevRepos) => [...prevRepos, ...response?.data]);
    } else if (response && response?.data.length === 0) {
      refObserver.current.unobserve(refLoadingObserver.current);
      refLoadingObserver.current.remove();
    }
  }, [response]);

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
      <StyleLoadingObserver ref={refLoadingObserver} />
    </StyledContainer>
  );
};

export default App;

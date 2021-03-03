import React, { useEffect, useState } from 'react';
import useAsync from './hooks/useAsync';
import useSkipFirstMount from './hooks/useSkipFirstMount';
import useIntersection from './hooks/useIntersection';
import { fetchReposAsync } from './api/repo';
import iconLion from './static/lion.png';
import cons from './constant';
import { StyledContainer, StyledTitle, StyledIcon, StyledCard, StyledLink, StyledTarget } from './styles/styled';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const App = () => {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [params, setParams] = useState(cons.INIT_PARAMS);
  const [repos, setRepos] = useState([]);
  const { execute, response, error } = useAsync(fetchReposAsync);
  const [refObserver, refContainer, refTarget] = useIntersection({
    update: function () {
      setParams((prevParams) => ({ ...prevParams, pageNum: prevParams.pageNum + 1 }));
    }
  });

  useSkipFirstMount(() => {
    if (params) execute(params);
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
      setIsShowAlert(true);
      refObserver.current.disconnect();
      refTarget.current.remove();
    }
  }, [error, refObserver, refTarget]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setIsShowAlert(false);
  };

  return (
    <StyledContainer rel={refContainer}>
      <Snackbar
        open={isShowAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3500}
        onClose={handleClose}>
        <Alert severity="warning">{cons.ALERT_MESSAGE}</Alert>
      </Snackbar>

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

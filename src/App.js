import React, { useEffect, useState } from 'react';
import useAsync from './hooks/useAsync';
import useSkipFirstMount from './hooks/useSkipFirstMount';
import useIntersection from './hooks/useIntersection';
import { fetchReposAsync } from './api/repo';
import iconLion from './static/lion.png';
import cons from './constant';

// material-ui
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useStylesContainer, useStylesIconLion, useStylesCard, useStylesTarget } from './styles/styled';

const App = () => {
  const classesContainer = useStylesContainer();
  const classesIconLion = useStylesIconLion();
  const classesCard = useStylesCard();
  const classesTarget = useStylesTarget();

  const [isShowAlert, setIsShowAlert] = useState(false);
  const [params, setParams] = useState(cons.INIT_PARAMS);
  const [repos, setRepos] = useState([]);
  const { execute, response, error } = useAsync(fetchReposAsync);
  const [refObserver, refContainer, refTarget] = useIntersection(function () {
    setParams((prevParams) => ({ ...prevParams, pageNum: prevParams.pageNum + 1 }));
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
    <Container maxWidth="lg" className={classesContainer.root} rel={refContainer}>
      <Snackbar
        open={isShowAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3500}
        onClose={handleClose}>
        <Alert severity="warning">{cons.ALERT_MESSAGE}</Alert>
      </Snackbar>

      <Typography variant="h4" gutterBottom={true}>
        <Avatar src={iconLion} variant="rounded" className={classesIconLion.root} />
        {cons.INIT_PARAMS.user} repo list:
      </Typography>

      {repos.map((repo) => (
        <div key={repo.id} className={classesCard.root}>
          <Typography variant="h6" noWrap={true} children={repo.name} />
          <Typography variant="body1" noWrap={true} children={repo.description} />
          <Typography noWrap>
            <Link href={repo.html_url} target="_blank" rel="noopener" children={repo.html_url} />
          </Typography>
        </div>
      ))}

      <div ref={refTarget} className={classesTarget.root} />
    </Container>
  );
};

export default App;

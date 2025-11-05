import { Container } from '@/components/common/container';
import { FC, Fragment } from 'react';
import { Projects2 } from './projects2';

interface PageProps{
  trips:any;
}
const ProjectColumn3Page:FC<PageProps> = ({ trips }) => {
 
  return (
    <Fragment>
      <Container>
        <Projects2 trips={trips} />
      </Container>
    </Fragment>
  );
}
export { ProjectColumn3Page };
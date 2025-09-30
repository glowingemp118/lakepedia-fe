import { Container } from '@/components/common/container';
import { Fragment } from 'react';
import { AccountBasicContent } from './account-basic-content';

export function AccountBasicPage() {

  return (
    <Fragment>
      <Container>
        <AccountBasicContent />
      </Container>
    </Fragment>
  );
}

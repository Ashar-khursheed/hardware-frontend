'use client';
import { Container } from 'reactstrap';
import PageCard from './PageCard';
import Breadcrumbs from '@/Utils/CommonComponents/Breadcrumb';

const PagesContent = ({ params }) => {
  return (
    <>
      <Breadcrumbs title={params.split('-').join(' ')} subNavigation={[{ name: 'pages' }, { name: params }]} />
      <section className='blog-section section-b-space'>
        <Container>
          <PageCard params={params} />
        </Container>
      </section>
    </>
  );
};

export default PagesContent;

import { NextComponentType, NextPageContext } from 'next';
import { List } from '../../components/{{{lc}}}/List';
import { PagedCollection } from '../../types/Collection';
import { {{{ucf}}} } from '../../types/{{{ucf}}}';
import { fetch } from '../../utils/dataAccess';
import Head from "next/head";

interface Props {
  collection: PagedCollection<{{{ucf}}}>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({collection}) => (
   <div>
      <div>
        <Head>
          <title>{{{ucf}}} List</title>
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML=\{{
                  __html: JSON.stringify(
                    collection
                  ),
                }}
              />
        </Head>
      </div>
      <List {{{name}}}={collection['{{{hydraPrefix}}}member']}/>
    </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch('/{{{name}}}');

  return {collection};
};

export default Page;

import { NextComponentType, NextPageContext } from 'next';
import { Show } from '../../../components/{{{lc}}}/Show';
import { {{{ucf}}} } from '../../../types/{{{ucf}}}';
import { fetch } from '../../../utils/dataAccess';
import Head from "next/head";

interface Props {
  {{{lc}}}: {{{ucf}}};
};

const Page: NextComponentType<NextPageContext, Props, Props> = ({ {{{lc}}} }) => {
  return (
    <div>
      <div>
          <Head>
            <title>{`Show {{{ucf}}} ${ {{~lc}}['@id']}`}</title>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML=\{{
                  __html: JSON.stringify(
                    {{{lc}}}
                  ),
                }}
            />
          </Head>
        </div>
      <Show {{{lc}}}={ {{{lc}}} }/>
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const {{{lc}}} = await fetch(asPath);

  return { {{{lc}}} };
};

export default Page;

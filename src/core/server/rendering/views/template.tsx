/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, createElement } from 'react';

import { RenderingMetadata } from '../types';
import { Fonts } from './fonts';
import { Styles } from './styles';
import theme from '../../../../../config/theme.json';

interface Props {
  metadata: RenderingMetadata;
}

export const Template: FunctionComponent<Props> = ({
  metadata: {
    uiPublicUrl,
    locale,
    darkMode,
    injectedMetadata,
    i18n,
    bootstrapScriptUrl,
    strictCsp,
  },
}) => {
  const logo = <img src={theme.loaderLogo} alt="" />;
  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width" />
        <title>Elastic</title>
        <Fonts url={uiPublicUrl} />
        {/* Favicons (generated from http://realfavicongenerator.net/) */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${uiPublicUrl}/favicons/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${uiPublicUrl}/favicons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${uiPublicUrl}/favicons/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${uiPublicUrl}/favicons/manifest.json`} />
        <link
          rel="mask-icon"
          color="#e8488b"
          href={`${uiPublicUrl}/favicons/safari-pinned-tab.svg`}
        />
        <link rel="shortcut icon" href={`${uiPublicUrl}/favicons/favicon.ico`} />
        <meta name="msapplication-config" content={`${uiPublicUrl}/favicons/browserconfig.xml`} />
        <meta name="theme-color" content="#ffffff" />
        <Styles darkMode={darkMode} />

        {/* Inject stylesheets into the <head> before scripts so that KP plugins with bundled styles will override them */}
        <meta name="add-styles-here" />
        <meta name="add-scripts-here" />
      </head>
      <body>
        {createElement('kbn-csp', {
          data: JSON.stringify({ strictCsp }),
        })}
        {createElement('kbn-injected-metadata', { data: JSON.stringify(injectedMetadata) })}
        <div
          className="kbnWelcomeView"
          id="kbn_loading_message"
          style={{ display: 'none' }}
          data-test-subj="kbnLoadingMessage"
        >
          <div className="kbnLoaderWrap">
            {logo}
            <div
              className="kbnWelcomeText"
              data-error-message={i18n('core.ui.welcomeErrorMessage', {
                defaultMessage:
                  'Elastic did not load properly. Check the server output for more information.',
              })}
            >
              {i18n('core.ui.welcomeMessage', { defaultMessage: `Loading ${theme.title}` })}
            </div>
            <div className="kbnProgress" />
          </div>
        </div>

        <div className="kbnWelcomeView" id="kbn_legacy_browser_error" style={{ display: 'none' }}>
          {logo}

          <h2 className="kbnWelcomeTitle">
            {i18n('core.ui.legacyBrowserTitle', {
              defaultMessage: 'Please upgrade your browser',
            })}
          </h2>
          <div className="kbnWelcomeText">
            {i18n('core.ui.legacyBrowserMessage', {
              defaultMessage:
                'This Elastic installation has strict security requirements enabled that your current browser does not meet.',
            })}
          </div>
        </div>

        <script>
          {`
            // Since this is an unsafe inline script, this code will not run
            // in browsers that support content security policy(CSP). This is
            // intentional as we check for the existence of __kbnCspNotEnforced__ in
            // bootstrap.
            window.__kbnCspNotEnforced__ = true;
          `}
        </script>
        <script src={bootstrapScriptUrl} />
      </body>
    </html>
  );
};

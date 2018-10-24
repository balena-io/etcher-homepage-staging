import React from 'react';
import styled, { withTheme } from 'styled-components';
import get from 'lodash/get';

import { Heading, Banner, Image, Flex, Link, DropDownButton } from 'resin-components';
import DownloadButton from './DownloadButton'
import background from '../images/red-background.svg';
import stepsGif from '../images/etcherImg/steps.gif'
import arrowPic from '../images/etcherImg/arrow.svg'

const DownloadFlex = styled(Flex) `
  div.download-etcher {
    width: 260px;
    background: #a5de37;
    borderColor: #a5de37;
  }
  div.download-etcher-cli {
    margin-left: 15px;
    width: 278px;
    background: transparent;
    borderColor: #a5de37;
  }

  button.download-etcher {
    color: #172c3d;
  }
  button.download-etcher-cli {
    color: #ffffff;
  }

  div.download-button,
  button.download-button:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding-right: 0;
  }
  div.download-button,
  button.download-button:nth-child(2) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  button.download-button:first-child {
    width: calc(100% - 42px)
  }
  button.download-button:nth-child(2) {
    width: 42px;
    padding: 0;
  }
`

export default withTheme((props) => {
  const getter = key => get(props, key);

	return (
		<Banner
			py={3}
			backgroundImage={background}
			color="white"
			style={{
				minHeight: 'auto',
				height: 640,
				position: 'relative',
      }}
		>
			<Flex width={1/2} direction='column' justifyContent='center' style={{ zIndex: 1 }}>
				<Heading.h1 align="center" my={3} style={{ fontSize: '72px'}}>
					{getter('settings.lead') ||
						getter('settings.description') ||
						getter('settings.name')}
				</Heading.h1>
				<Heading.h2 align="center" my={3} style={{ fontSize: '18px' }}>
					{getter('settings.description') ||
						getter('settings.name')}
				</Heading.h2>	
			</Flex>

      <Flex alignItems='center' justifyContent='center' style={{ backgroundColor: '#3F617D', margin: '50px', width: '589px', height: '132px' }} >
        <Image src={stepsGif}/>
			</Flex>
      
      <DownloadFlex direction='row' id='download-flex' justifyContent='center' alignItems='center'>
        <DownloadButton
          className='download-button download-etcher'
          releases={props.settings.releases}/>

        <DownloadButton
          className='download-button download-etcher-cli'
          label={<span>Install experimental CLI</span>}
          releases={props.settings.cliDownloads}
          outline
          whiteCaretStyle
        />
      </DownloadFlex>
		</Banner>
	);
});

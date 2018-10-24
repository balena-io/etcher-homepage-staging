import { withTheme } from 'styled-components'
import * as React from 'react'
import { DropDownButton, Link } from 'resin-components'
import { compose } from 'recompose'
import Sniffr from 'sniffr'
import arch from 'arch'
import sortBy from 'lodash/sortBy'

class DownloadButton extends DropDownButton {
  constructor(props) {
    super(props)
    this.state = {
      label: props.label,
      link: props.releases[0],
      links: props.releases.slice(1)
    }
  }

  componentDidMount() {
    const client = new Sniffr();

    client.sniff(window.navigator.userAgent);
    client.os.arch = arch();

    const links = this.props.releases;

    const score = (condition, p) => (!condition ? p : 0);

    const sortedLinks = sortBy(links, l => {
      let linkScore = score(
        l.os.toLowerCase() === client.os.name.toLowerCase(),
        2
      );
      if (linkScore === 0) {
        linkScore = linkScore + (l.arch === client.os.arch, 1);
      }

      return linkScore;
    });

    this.setState({
      link: sortedLinks[0],
      links: sortedLinks.splice(1)
    });
  }

  render() {
    const { label, link, links } = this.state;
    const linkLabel = <Link href={link.href} color='#2a506f'>{`Download ${link.text.split(' ').slice(1, 4).join(' ')}`}</Link>
    const linksArray = (label) ? [link].concat(links) : links
    return (
      <DropDownButton
        primary
        label={(label || linkLabel)}
        {...this.props}>
        {linksArray.map((l, index) => {
          return (
            <Link key={index} href={l.href} color='#2a506f'>{l.text}</Link>
          );
        })}
      </DropDownButton>
    )
  }
}

export default compose(withTheme)(DownloadButton)
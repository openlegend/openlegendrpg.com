import React from "react";
import { StaticImage } from 'gatsby-plugin-image';


import BackgroundSection from '../components/background-section';
import NavLayout from '../layouts/nav-layout';
import VideoComponent from '../components/video-component';

import OpenLegendFooter from '../components/open-legend-footer';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import WarningIcon from '@material-ui/icons/Warning';
import PeopleIcon from '@material-ui/icons/People';
import ForwardIcon from '@material-ui/icons/Forward';
import { green, yellow } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: '0 24px',
    overflow: 'auto',
  },
  mainContentContainer: {
    background: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    padding: '16px',
    marginTop: '84px',
    "& a": {
      color: yellow[400]
    }
  },
  mainColumn: {
    paddingRight: '16px',
    '& > *': {
      margin: '8px'
    },
    '& p': {
      padding: '8px'
    }
  },
  sideBar: {
    '& > *': {
      paddingBottom: '16px',
    }
  },
  infoItem: {
    background: 'rgba(0, 0, 0, 0.5)',
  }
}))

const IndexPage = (props) => {
  const classes = useStyles();

  return (
        <BackgroundSection>
          <Grid container direction='row' justify='flex-start' alignItems='flex-start' className={classes.pageContainer}> 
            <Grid item xs={12}>
              <StaticImage 
                loading='eager'
                src='../img/open_legend_lg_logo.png'
                alt='Open Legend Logo'
                style={{ margin: '56px 24px', maxWidth: '600px',  }}
              />
            </Grid>
            <Grid container item direction='row' wrap='wrap' className={classes.mainContentContainer} >
              <Grid container item justify='space-between' direction='column' xs={12} sm={8} className={classes.mainColumn} >
                <Typography variant='body1' className={classes.infoItem}>
                  <WarningIcon style={{ color: yellow[500] }} /> 
                  <strong>New! Open Legend Store is Online</strong>
                  <br />
                  'Tis the end of a very long era where we were allowing people to back the Kickstarter late via BackerKit. Welcome to the bright new future with the <strong>official</strong> Open Legend Store. 
                  <strong>  <a href="https://store.openlegendrpg.com">Get in there!</a>  </strong>
                  You can purchase physical books, bane and boon decks, our beautiful maps, and more.
                </Typography>

                <Typography variant='body1' className={classes.infoItem}>
                  <PeopleIcon style={{ color: green[500] }} />
                  <strong>New! Open Legend Store is Online</strong>
                  <br />
                  Many community members have expressed a wish for a more easy-to-navigate place to discuss Open Legend. We've heard your desperate pleas and we've replaced MightyBell with a new forum. It's ready and waiting for your enthusiastic participation, 
                  <strong> <a href="http://community.openlegendrpg.com/">go join the conversation</a>!</strong>
                </Typography>

                <VideoComponent 
                  name='Open Legend: Open-source RPG' 
                  type='video/mp4'
                  videoSrc='https://v.kickstarter.com/1618577432_0fbcce345ce12f0badc585e2fabab4091e5067ee/projects/2577729/video-717401-h264_base.mp4' 
                  imgSrc='https://ksr-ugc.imgix.net/assets/014/074/537/2964d8990fd4fa90599c80bd90b32bf7_original.png?ixlib=rb-2.1.0&crop=faces&w=1024&h=576&fit=crop&v=1476922327&auto=format&frame=1&q=92&s=70bc941146d3400c1eb50e67cbed22f6'
                />

                <Typography variant='h4'>What is Open Legend?</Typography>
                <Typography variant='body1'>
                  Open Legend is a tabletop roleplaying game (or RPG) in which the players play the part of mighty heroes and wicked villains in order to tell stories of epic proportion. In each game of Open Legend, the intrepid characters will fight mythic beasts, break ancient curses, unravel mysterious enigmas, discover treasures untold, and more.
                </Typography>
                <Grid item component='a' href='http://www.drivethrurpg.com/product/190330/A-Star-Once-Fallen'>
                  <StaticImage 
                    loading='lazy'
                    src='../img/a_star_once_fallen_promo_banner.jpg'
                    alt='A Star Once Fallen Adventure Free Download'
                  />
                </Grid>
                <Typography variant='body1'>
                  Open Legend is a streamlined system designed to let you tell big stories using small rules. The rules get complex when they need to, but never cumbersome, and wherever they could be cut out or simplified, they have been. Some of the highlights at the heart of Open Legend are explained below.
                </Typography>
                <Typography variant='body1'><ForwardIcon /> <a href='/core-rules/introduction'>Or Dive Right Into The Core Rules</a></Typography>

                <Typography variant='h4'>Tell Stories of Legend, Not Cliché</Typography>
                <Typography variant='body2'><strong>UNHINDERED CHARACTER CUSTOMIZATION</strong></Typography>
                <Typography variant='body1'>
                  With Open Legend, every ability you choose for your character is a new decision. You're never required to choose from a short list, and every character has the potential to access every ability. The story you choose to tell with these abilities and how they manifest, is an opportunity to let your imagination run wild. Select the abilities that match your vision and ignore the ones that don’t. Or, you can get started with one of our quick builds. Either way, the best part is, it's fast and simple but still has lots of potential for intricate and complex characters, if that's what you're looking for. Complex and simple characters can both play a meaningful role in an Open Legend game.
                  <ForwardIcon /> <a href="/core-rules/character-creation"> Find out more about character building</a>
                </Typography>
                
                <Typography variant='h4'>Smite Your Foes, Shield Your Friends</Typography>
                <Typography variant='body2'><strong>BANES & BOONS FOR EVERY CHARACTERS</strong></Typography>
                <Typography variant='body1'>
                  Open Legend features a collection of banes and boons that any character can use as long as they possess the appropriate attributes. Banes allow you to stun your enemies, set them ablaze, or otherwise hinder them with devastating status effects. Boons are perks that you grant yourself or allies, such as magical healing, damage resistance, and flight. In Open Legend, no fighter is just a walking meat shield with a blade. He’s a trained combatant who can stun, blind, cripple, and hurl his foes across the battlefield. And when a sorceress summons an icy storm from the skies, she decides at the time of casting if she also wants it to slow, knockdown, or immobilize her enemies.
                  <ForwardIcon /> <a href="/banes"> See a list of banes</a>
                </Typography>
                
                <Typography variant='h4'>Roll Dice, Roll Lots of Dice</Typography>
                <Typography variant='body2'><strong>DICE WITHOUT LIMIT</strong></Typography>
                <Typography variant='body1'>
                  In Open Legend, dice explode! That means that whenever any die rolls maximum, you get to reroll it and add the new roll to your total, ad infinitum. We love to tell a good story, but rolling dice is just so much fun, we thought that occasionally, you should get to roll a lot of them. The volatile nature of exploding dice makes every roll count, and every session of Open Legend is full of tense moments when the tides can turn at a moment’s notice, for better or worse.
                </Typography>
                
                <Typography variant='h4'>Craft Your Setting, Create Your World</Typography>
                <Typography variant='body2'><strong>ANY GENRE, ENDLESS POSSIBILITIES</strong></Typography>
                <Typography variant='body1'>
                  The core rules are written to reflect a high fantasy, sword and sorcery setting, but Open Legend was purposefully designed to be open to any genre. The mechanics of the game focus on effects rather than flavor so that your gaming table can tell whatever kind of story it wants. Struggle for survival in a post-apocalyptic zombie wasteland. Soar amidst the clouds on your crystal-powered airship in a steampunk inspired campaign of swashbuckling sky pirates. Explore an alien-infested space station abandoned at the edge of the universe. The possibilities are endless.
                </Typography>
                
                <Typography variant='h4'>Share the Legend</Typography>
                <Typography variant='body2'><strong>OPEN SOURCE RULES</strong></Typography>
                <Typography variant='body1'>
                Yes, you can copy portions of the rules, share your unique character builds, invent your own feats, and write adventure modules or campaign settings. If you want to publish and sell your content, just have a look at <a href='/community-license'>our commercial license</a>. We know you’ll love the game as much as we do, and we hope you’ll spread the love by publishing your own adventures, rules supplements, and more.
                </Typography>

              </Grid>
              <Grid container item direction='column' xs={12} sm={4} className={classes.sideBar} >
                <Grid item component='a' href="/core-rules/introduction" >
                  <StaticImage 
                    loading='eager'
                    src='../img/open_legend_get_started.jpg'
                    alt=''
                  />
                </Grid> 
                <Grid item component='a' href="http://community.openlegendrpg.com/" >
                  <StaticImage 
                    loading='eager'
                    src='../img/open_legend_contribute.jpg'
                    alt=''
                  />
                </Grid> 
              </Grid>
            </Grid>

            <OpenLegendFooter isIndexPage={true} />
          </Grid>
        </BackgroundSection>
  )
}

export default IndexPage;

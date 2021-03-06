import { React } from "react";
import * as NBAIcon from "react-nba-logos";
import * as NFLIcon from "react-nfl-logos";
// import * as NHLIcon from "react-nhl-logos";

const renderLogo = (league, abbreviation, size) => {
    switch(league) {
        case 'NBA':
            switch (abbreviation) {
                case "ATL":
                    return <NBAIcon.ATL size={size} />;

                case "BKN":
                    return <NBAIcon.BKN size={size} />;

                case "BOS":
                    return <NBAIcon.BOS size={size} />;

                case "CHA":
                    return <NBAIcon.CHA size={size} />;

                case "CHI":
                    return <NBAIcon.CHI size={size} />;

                case "CLE":
                    return <NBAIcon.CLE size={size} />;

                case "DAL":
                    return <NBAIcon.DAL size={size} />;

                case "DEN":
                    return <NBAIcon.DEN size={size} />;

                case "DET":
                    return <NBAIcon.DET size={size} />;

                case "GSW":
                    return <NBAIcon.GSW size={size} />;

                case "HOU":
                    return <NBAIcon.HOU size={size} />;

                case "IND":
                    return <NBAIcon.IND size={size} />;

                case "LAC":
                    return <NBAIcon.LAC size={size} />;

                case "LAL":
                    return <NBAIcon.LAL size={size} />;

                case "MEM":
                    return <NBAIcon.MEM size={size} />;

                case "MIA":
                    return <NBAIcon.MIA size={size} />;

                case "MIL":
                    return <NBAIcon.MIL size={size} />;

                case "MIN":
                    return <NBAIcon.MIN size={size} />;

                case "NOP":
                    return <NBAIcon.NOP size={size} />;

                case "NYK":
                    return <NBAIcon.NYK size={size} />;

                case "OKC":
                    return <NBAIcon.OKC size={size} />;

                case "ORL":
                    return <NBAIcon.ORL size={size} />;

                case "PHI":
                    return <NBAIcon.PHI size={size} />;

                case "PHX":
                    return <NBAIcon.PHX size={size} />;

                case "POR":
                    return <NBAIcon.POR size={size} />;

                case "SAC":
                    return <NBAIcon.SAC size={size} />;

                case "SAS":
                    return <NBAIcon.SAS size={size} />;

                case "TOR":
                    return <NBAIcon.TOR size={size} />;

                case "UTA":
                    return <NBAIcon.UTA size={size} />;

                case "WAS":
                    return <NBAIcon.WAS size={size} />;

                default:
                    return null;
            }

        case 'NFL':
            switch (abbreviation) {

                case "CRD":
                    return <NFLIcon.ARI size={size} />;

                case "ATL":
                    return <NFLIcon.ATL size={size} />;
                
                case "RAV":
                    return <NFLIcon.BAL size={size} />;
            
                case "BUF":
                    return <NFLIcon.BUF size={size} />;

                case "CAR":
                    return <NFLIcon.CAR size={size} />;

                case "CHI":
                    return <NFLIcon.CHI size={size} />;
                
                case "CIN":
                    return <NFLIcon.CIN size={size} />;

                case "CLE":
                    return <NFLIcon.CLE size={size} />;

                case "DAL":
                    return <NFLIcon.DAL size={size} />;
                    
                case "DEN":
                    return <NFLIcon.DEN size={size} />;

                case "DET":
                    return <NFLIcon.DET size={size} />;

                case "GNB":
                    return <NFLIcon.GB size={size} />;

                case "HTX":
                    return <NFLIcon.HOU size={size} />;

                case "CLT":
                    return <NFLIcon.IND size={size} />;

                case "JAX":
                    return <NFLIcon.JAX size={size} />;

                case "KC":
                    return <NFLIcon.KC size={size} />;

                case "LV":
                    return <NFLIcon.LV size={size} />;

                case "LAC":
                    return <NFLIcon.LAC size={size} />;

                case "LA":
                    return <NFLIcon.LAR size={size} />;
                
                case "MIA":
                    return <NFLIcon.MIA size={size} />;

                case "MIN":
                    return <NFLIcon.MIN size={size} />;

                case "NE":
                    return <NFLIcon.NE size={size} />;

                case "NOR":
                    return <NFLIcon.NO size={size} />;

                case "NYG":
                    return <NFLIcon.NYG size={size} />;

                case "NYJ":
                    return <NFLIcon.NYJ size={size} />;

                case "PHI":
                    return <NFLIcon.PHI size={size} />;

                case "PIT":
                    return <NFLIcon.PIT size={size} />;

                case "SFO":
                    return <NFLIcon.SF size={size} />;
                
                case "SEA":
                    return <NFLIcon.SEA size={size} />;

                case "TB":
                    return <NFLIcon.TB size={size} />;

                case "WSH":
                    return <NFLIcon.WAS size={size} />;
        
                case "OTI":
                    return <NFLIcon.OTI size={size} />;

                case "WAS":
                    return <NFLIcon.WAS size={size} />;


                default:
                    return null;
            }

        // case 'NHL':
        //     switch (abbreviation) {
        //         case "ANA":
        //             return <NHLIcon.ANA size={size} />;

        //         case "ARI":
        //             return <NHLIcon.ARI size={size} />;

        //         case "BOS":
        //             return <NHLIcon.BOS size={size} />;
                
        //         case "BUF":
        //             return <NHLIcon.BUF size={size} />;
            
        //         case "CAR":
        //             return <NHLIcon.CAR size={size} />;

        //         case "CBJ":
        //             return <NHLIcon.CBJ size={size} />;

        //         case "CGY":
        //             return <NHLIcon.CGY size={size} />;
                
        //         case "CHI":
        //             return <NHLIcon.CHI size={size} />;

        //         case "COL":
        //             return <NHLIcon.COL size={size} />;

        //         case "DAL":
        //             return <NHLIcon.DAL size={size} />;
                    
        //         case "DET":
        //             return <NHLIcon.DET size={size} />;

        //         case "EDM":
        //             return <NHLIcon.EDM size={size} />;

        //         case "FLA":
        //             return <NHLIcon.FLA size={size} />;

        //         case "LAK":
        //             return <NHLIcon.LAK size={size} />;

        //         case "MIL":
        //             return <NHLIcon.MIL size={size} />;

        //         case "NJD":
        //             return <NHLIcon.NJD size={size} />;

        //         case "NSH":
        //             return <NHLIcon.NSH size={size} />;

        //         case "NYI":
        //             return <NHLIcon.NYI size={size} />;

        //         case "NYR":
        //             return <NHLIcon.NYR size={size} />;

        //         case "OTT":
        //             return <NHLIcon.OTT size={size} />;

        //         case "PHI":
        //             return <NHLIcon.PHI size={size} />;

        //         case "PIT":
        //             return <NHLIcon.PIT size={size} />;

        //         case "SJS":
        //             return <NHLIcon.SJS size={size} />;

        //         case "STL":
        //             return <NHLIcon.STL size={size} />;

        //         case "TBL":
        //             return <NHLIcon.TBL size={size} />;

        //         case "TOR":
        //             return <NHLIcon.TOR size={size} />;

        //         case "VAN":
        //             return <NHLIcon.VAN size={size} />;

        //         case "VGK":
        //             return <NHLIcon.VGK size={size} />;

        //         case "WPG":
        //             return <NHLIcon.WPG size={size} />;

        //         case "WSH":
        //             return <NHLIcon.WSH size={size} />;

            //     default:
            //     break;
            // }


        default:
            break;
        }
};

export default renderLogo;
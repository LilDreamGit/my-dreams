// IZH ahaz  zahar , quiero vomitar veneno sin parar, VOTH
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useState } from "react";
import stateColors from "../../data/maps/stateColors";
import { countryAlliances, allegianceColors } from "../../data/maps/countryAlliances";
import Panel from "../Panel";

const geoUrl = "/json/countries-50m.json";
const statesUrl = "/json/us-states-10m.json";

export default function WorldMap() {
  const [tooltip, setTooltip] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [stateTooltip, setStateTooltip] = useState("");
  const [statePosition, setStatePosition] = useState({ x: 0, y: 0 });

  const [worldView, setWorldView] = useState({ coordinates: [0, 0], zoom: 1 });
  const [usaView, setUsaView] = useState({ coordinates: [-97, 38], zoom: 1 });

  const getFill = (geo) => {
    const id = String(geo.id);
    const rec = countryAlliances[id];
    if (!rec) return allegianceColors.neutral;
    return allegianceColors[rec.allegiance] ?? allegianceColors.neutral;
  };

  const getTooltipText = (geo) => {
    const id = String(geo.id);
    const name = geo.properties?.name || geo.properties?.NAME || "Unknown";
    const rec = countryAlliances[id];
    if (!rec) return `${name}\nAllegiance: Neutral\nPower Index: —`;
    return `${name}\nAllegiance: ${rec.allegiance.toUpperCase()}\nPower Index: ${rec.powerIndex}`;
  };

  const getStrokeWidth = () => 0.4;

  return (
    <div className="flex flex-col items-center p-6 text-white w-full h-full">

      {/* GLOBAL SVG defs */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <pattern id="blueRedStripe" patternUnits="userSpaceOnUse" width="6" height="6">
            <rect width="6" height="6" fill="#3B82F6" />
            <path d="M0 6 L6 0 M-3 3 L3 -3 M3 9 L9 3" stroke="#EF4444" strokeWidth="2" />
          </pattern>
        </defs>
      </svg>

      <h2 className="text-2xl font-bold mb-6">🪙 Sides of the Coin</h2>

      {/* 🌍 WORLD MAP SECTION */}
      <div className="w-full max-w-6xl space-y-3 mb-10">

        <Panel title="🌍 World Map Legend" defaultOpen>
          <div className="flex flex-wrap gap-4 text-xs">

            <div className="flex items-center gap-2">
              <div className="w-3 h-3" style={{ background: allegianceColors.blue }} />
              <span>USA bloc</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3" style={{ background: allegianceColors.neutral }} />
              <span>Neutral</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3" style={{ background: allegianceColors.red }} />
              <span>The Others</span>
            </div>

            <div className="flex items-center gap-2">
              <svg width="12" height="12">
                <rect width="12" height="12" fill="url(#blueRedStripe)" />
              </svg>
              <span>Conflict</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3" style={{ background: allegianceColors.ultraviolence }} />
              <span>Ultraviolence</span>
            </div>

            {/* TEXT BOX */}
            <div className="bg-black/80 border border-purple-500/30 rounded-lg p-5 shadow-inner">
              <p className="text-base md:text-lg text-purple-200 leading-relaxed tracking-wide">
                I leave the lands to the USA and and i hope that god's will prevail after all. things end, and rage can go as far, i hope the administration achieves the goals.
                i wish i could put in text the voices in my head , the constant image that i cannot describe, but i try , and that all we ask, demons or angel
                we work for god, the true god. 
                Let the bombs drop away and delete the building and shake the earthm break into pieces as it smashes into the ground, pulverzing, obitaring everything, with and enormous heat, the alarms, were useless
                and the destroy eminnent, all the other nukes were on the space like stars, and they shine like stars from the ground, and , and, and, i get without of breath
                with at the end of the day i wanted, i feel like it, i was good at it? but i really enjoy , at the end, i did really choose the end, kinda, in my own way, a wanna  obliterate a sun or a quasr or
                maybe, just maybe, i am that dark star, alone in the fucking nothing, wanting to haunt, funny today i saw a crocodile eat a feline.
                natures way, sometimes, i dk, just the most horrible happens, lets see. ill just hide away in my homeland peru , one of the last plces to see the bombs jsajsjd 
              </p>
            </div>
          </div>
        </Panel>

        <div className="w-full bg-black aspect-[2/1] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <ComposableMap projectionConfig={{ scale: 160 }} style={{ width: "100%", height: "100%" }}>
            <ZoomableGroup zoom={worldView.zoom} center={worldView.coordinates} onMoveEnd={setWorldView}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getFill(geo)}
                      stroke="#222"
                      strokeWidth={getStrokeWidth()}
                      onMouseEnter={() => setTooltip(getTooltipText(geo))}
                      onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setTooltip("")}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          outline: "none",
                          filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>

      {/* 🇺🇸 USA MAP SECTION */}
      <div className="w-full max-w-6xl space-y-3">

        <Panel title="🇺🇸 USA Map Legend" defaultOpen>
          <div className="flex flex-wrap gap-4 text-xs">

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#EF4444]" />
              <span>Pure Red</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3B82F6]" />
              <span>Blue</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #EF4444 0, #EF4444 3px, #3B82F6 3px, #3B82F6 6px)",
                }}
              />
              <span>Conflict</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#4c0099]" />
              <h1>Curse Strong</h1>
            </div>

            {/* TEXT BOX */}
            <div className="bg-black/80 border border-purple-500/30 rounded-lg p-5 shadow-inner">
              <p className="text-base md:text-lg text-purple-200 leading-relaxed tracking-wide">
                It was nothing personal, or maybe it was, mayb ei am the problem, i just dont care too much, anyways, i know i should die, but come on kill me
                that wont fix the real trouble, i just call it okay? but deep inside of me i wanna own it and say i want it fuck it, in florida ther would a hard huracaine and hit brickle and kill and bunch of people in some area speciaficly
                also in the SF there would be and earth queake, but not that hard, but tehre would be damaged ingrastructe hard, some cities will be, whatever, happens with new york anyways.
                Endless nightamres for youall, is been good to haunt you, :D
              </p>
            </div>

          </div>
        </Panel>

        <div className="w-full bg-black aspect-[2/1] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <ComposableMap projection="geoAlbersUsa" style={{ width: "100%", height: "100%" }}>
            <ZoomableGroup zoom={usaView.zoom} center={usaView.coordinates} onMoveEnd={setUsaView}>
              <Geographies geography={statesUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.name;
                    const color = stateColors[stateName] || "#ccc";
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={color}
                        stroke="#222"
                        onMouseEnter={() => setStateTooltip(stateName)}
                        onMouseMove={(e) => setStatePosition({ x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setStateTooltip("")}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            outline: "none",
                            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>

      {/* 🌐 Tooltips */}
      {tooltip && (
        <div
          className="fixed bg-black/80 text-white text-xs px-3 py-1 rounded-lg shadow-lg pointer-events-none z-50 whitespace-pre"
          style={{ top: position.y + 7, left: position.x + 7 }}
        >
          {tooltip}
        </div>
      )}

      {stateTooltip && (
        <div
          className="fixed bg-black/80 text-white text-xs px-3 py-1 rounded-lg shadow-lg pointer-events-none z-50"
          style={{ top: statePosition.y + 7, left: statePosition.x + 7 }}
        >
          {stateTooltip}
        </div>
      )}
    </div>
  );
}
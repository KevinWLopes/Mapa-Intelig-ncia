import React, { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Car, Eye, EyeOff, Filter, Layers3, MapPin, Route, Search, ShieldAlert } from "lucide-react";

/**
 * V3 realista do painel, pronta para usar Google Maps + KmlLayer.
 *
 * COMO USAR:
 * 1) Crie uma chave do Google Maps JavaScript API.
 * 2) Defina essa chave em window.GOOGLE_MAPS_API_KEY
 *    ou troque GOOGLE_MAPS_API_KEY abaixo manualmente.
 * 3) Hospede seus arquivos KML/KMZ em URLs públicas.
 * 4) Ajuste os links em KML_SOURCES.
 *
 * OBS:
 * - KmlLayer só funciona com arquivo público sem autenticação.
 * - Para arquivos privados ou maior controle, o próximo passo é converter tudo para GeoJSON.
 */

const GOOGLE_MAPS_API_KEY = (globalThis?.GOOGLE_MAPS_API_KEY as string) || "";

const KML_SOURCES = {
  intelligenceMap:
    "https://www.google.com/maps/d/kml?forcekml=1&mid=1hIr4nwyACFmscQKrAmJZcaLBELN8Tzs",
  territorialRisk:
    "https://www.google.com/maps/d/kml?forcekml=1&mid=1lnMoFlzrZEwwlsqdNuPDPUtnoIUGBbU",
};

const CASES = [
  {
    id: "CASO-001",
    modelo: "HB20",
    marca: "Hyundai",
    ocorrencia: "Roubo",
    perda: { lat: -23.5402, lng: -46.4621, bairro: "Itaquera" },
    recuperacao: { lat: -23.4979, lng: -46.3965, bairro: "Poá" },
    descarte: { lat: -23.5173, lng: -46.4301, bairro: "Guaianases" },
    data: "2026-03-18",
    status: "Recuperado",
    cluster: "Eixo Leste",
  },
  {
    id: "CASO-002",
    modelo: "Argo",
    marca: "Fiat",
    ocorrencia: "Furto",
    perda: { lat: -23.5565, lng: -46.4108, bairro: "São Mateus" },
    recuperacao: { lat: -23.5121, lng: -46.3654, bairro: "Suzano" },
    descarte: { lat: -23.5349, lng: -46.3922, bairro: "Itaim Paulista" },
    data: "2026-03-12",
    status: "Recuperado",
    cluster: "Corredor SP-Suzano",
  },
  {
    id: "CASO-003",
    modelo: "Onix",
    marca: "Chevrolet",
    ocorrencia: "Roubo",
    perda: { lat: -23.6115, lng: -46.5712, bairro: "Santo Amaro" },
    recuperacao: { lat: -23.6693, lng: -46.5551, bairro: "Jardim Ângela" },
    descarte: { lat: -23.6404, lng: -46.5615, bairro: "Capão Redondo" },
    data: "2026-03-05",
    status: "Recuperado",
    cluster: "Eixo Sul",
  },
  {
    id: "CASO-004",
    modelo: "HB20",
    marca: "Hyundai",
    ocorrencia: "Roubo",
    perda: { lat: -23.5309, lng: -46.4485, bairro: "Artur Alvim" },
    recuperacao: { lat: -23.4834, lng: -46.3827, bairro: "Ferraz de Vasconcelos" },
    descarte: { lat: -23.5097, lng: -46.4205, bairro: "Cidade Tiradentes" },
    data: "2026-03-24",
    status: "Recuperado",
    cluster: "Eixo Leste",
  },
  {
    id: "CASO-005",
    modelo: "Kwid",
    marca: "Renault",
    ocorrencia: "Furto",
    perda: { lat: -23.4704, lng: -46.5288, bairro: "Vila Maria" },
    recuperacao: { lat: -23.4305, lng: -46.4652, bairro: "Guarulhos" },
    descarte: { lat: -23.4517, lng: -46.4913, bairro: "Cumbica" },
    data: "2026-03-20",
    status: "Recuperado",
    cluster: "Eixo Norte",
  },
];

const MODELOS = ["Todos", ...Array.from(new Set(CASES.map((c) => c.modelo)))];
const OCORRENCIAS = ["Todas", ...Array.from(new Set(CASES.map((c) => c.ocorrencia)))];
const CLUSTERS = ["Todos", ...Array.from(new Set(CASES.map((c) => c.cluster)))];

function loadGoogleMaps(apiKey: string): Promise<typeof google> {
  return new Promise((resolve, reject) => {
    if (!apiKey) {
      reject(new Error("Defina GOOGLE_MAPS_API_KEY para carregar o mapa."));
      return;
    }

    if (window.google?.maps) {
      resolve(window.google);
      return;
    }

    const existing = document.querySelector("script[data-google-maps='true']") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", () => reject(new Error("Falha ao carregar Google Maps.")));
      return;
    }

    const script = document.createElement("script");
    script.src = https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "true";
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Falha ao carregar Google Maps."));
    document.head.appendChild(script);
  });
}

function averageDistance(cases: typeof CASES) {
  if (!cases.length) return 0;
  const total = cases.reduce((sum, c) => {
    const dx = c.recuperacao.lat - c.perda.lat;
    const dy = c.recuperacao.lng - c.perda.lng;
    return sum + Math.sqrt(dx * dx + dy * dy) * 111;
  }, 0);
  return (total / cases.length).toFixed(1);
}

function createSvgPin(color: string, glyph: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
      <circle cx="21" cy="21" r="18" fill="${color}" fill-opacity="0.18"/>
      <circle cx="21" cy="21" r="12" fill="${color}"/>
      <text x="21" y="25" text-anchor="middle" font-size="12" font-family="Arial" fill="white">${glyph}</text>
    </svg>`;
  return data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)};
}

export default function IntelligenceFieldMapV3() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const kmlLayersRef = useRef<{ intelligence?: google.maps.KmlLayer; territorial?: google.maps.KmlLayer }>({});

  const [modelo, setModelo] = useState("Todos");
  const [ocorrencia, setOcorrencia] = useState("Todas");
  const [cluster, setCluster] = useState("Todos");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("CASO-004");
  const [showAreas, setShowAreas] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showIntelligenceKml, setShowIntelligenceKml] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState("");

  const filteredCases = useMemo(() => {
    return CASES.filter((c) => {
      const modeloOk = modelo === "Todos" || c.modelo === modelo;
      const ocorrenciaOk = ocorrencia === "Todas" || c.ocorrencia === ocorrencia;
      const clusterOk = cluster === "Todos" || c.cluster === cluster;
      const queryOk =
        !query ||
        c.id.toLowerCase().includes(query.toLowerCase()) ||
        c.modelo.toLowerCase().includes(query.toLowerCase()) ||
        c.marca.toLowerCase().includes(query.toLowerCase()) ||
        c.perda.bairro.toLowerCase().includes(query.toLowerCase()) ||
        c.recuperacao.bairro.toLowerCase().includes(query.toLowerCase());
      return modeloOk && ocorrenciaOk && clusterOk && queryOk;
    });
  }, [modelo, ocorrencia, cluster, query]);

  const selected = filteredCases.find((c) => c.id === selectedId) || filteredCases[0] || CASES[0];

  const stats = useMemo(() => {
    const topDestino = filteredCases.reduce<Record<string, number>>((acc, c) => {
      acc[c.recuperacao.bairro] = (acc[c.recuperacao.bairro] || 0) + 1;
      return acc;
    }, {});

    const bestDestino = Object.entries(topDestino).sort((a, b) => b[1] - a[1])[0];

    return {
      total: filteredCases.length,
      mediaKm: averageDistance(filteredCases),
      destino: bestDestino ? bestDestino[0] : "—",
      destinoQtd: bestDestino ? bestDestino[1] : 0,
    };
  }, [filteredCases]);

  const areaInsight = useMemo(() => {
    if (!filteredCases.length) return "Nenhum caso encontrado para cruzamento territorial.";
    const leste = filteredCases.filter((c) => c.cluster.includes("Leste")).length;
    const sul = filteredCases.filter((c) => c.cluster.includes("Sul")).length;
    const norte = filteredCases.filter((c) => c.cluster.includes("Norte")).length;
    const maior = [["Eixo Leste", leste], ["Eixo Sul", sul], ["Eixo Norte", norte]].sort((a, b) => b[1] - a[1])[0];
    return ${maior[1]} caso(s) convergem principalmente para o ${maior[0]}, permitindo leitura territorial e priorização operacional.;
  }, [filteredCases]);

  useEffect(() => {
    let cancelled = false;

    async function initializeMap() {
      try {
        const googleApi = await loadGoogleMaps(GOOGLE_MAPS_API_KEY);
        if (cancelled || !mapRef.current) return;

        const map = new googleApi.maps.Map(mapRef.current, {
          center: { lat: -23.4391, lng: -46.6382 },
          zoom: 10,
          mapTypeId: "roadmap",
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#082f49" }] },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
          ],
        });

        googleMapRef.current = map;

        kmlLayersRef.current.intelligence = new googleApi.maps.KmlLayer({
          url: KML_SOURCES.intelligenceMap,
          preserveViewport: true,
          suppressInfoWindows: false,
          map: showIntelligenceKml ? map : null,
        });

        kmlLayersRef.current.territorial = new googleApi.maps.KmlLayer({
          url: KML_SOURCES.territorialRisk,
          preserveViewport: true,
          suppressInfoWindows: false,
          map: showAreas ? map : null,
        });

        setMapReady(true);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Falha ao iniciar o mapa.";
        setMapError(message);
      }
    }

    initializeMap();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!googleMapRef.current || !window.google?.maps) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    polylinesRef.current.forEach((line) => line.setMap(null));
    markersRef.current = [];
    polylinesRef.current = [];

    if (!showEvents && !showLines) return;

    const bounds = new window.google.maps.LatLngBounds();

    filteredCases.forEach((c) => {
      const perda = new window.google.maps.LatLng(c.perda.lat, c.perda.lng);
      const recuperacao = new window.google.maps.LatLng(c.recuperacao.lat, c.recuperacao.lng);
      const descarte = new window.google.maps.LatLng(c.descarte.lat, c.descarte.lng);
      const active = selected?.id === c.id;

      if (showEvents) {
        const markerPerda = new window.google.maps.Marker({
          map: googleMapRef.current,
          position: perda,
          title: ${c.id} • Perda • ${c.perda.bairro},
          icon: {
            url: createSvgPin(active ? "#22d3ee" : "#0891b2", "P"),
            scaledSize: new window.google.maps.Size(active ? 42 : 36, active ? 42 : 36),
          },
        });

        const markerRec = new window.google.maps.Marker({
          map: googleMapRef.current,
          position: recuperacao,
          title: ${c.id} • Recuperação • ${c.recuperacao.bairro},
          icon: {
            url: createSvgPin(active ? "#34d399" : "#059669", "R"),
            scaledSize: new window.google.maps.Size(active ? 42 : 36, active ? 42 : 36),
          },
        });

        const markerDesc = new window.google.maps.Marker({
          map: googleMapRef.current,
          position: descarte,
          title: ${c.id} • Descarte • ${c.descarte.bairro},
          icon: {
            url: createSvgPin(active ? "#facc15" : "#ca8a04", "D"),
            scaledSize: new window.google.maps.Size(active ? 42 : 36, active ? 42 : 36),
          },
        });

        [markerPerda, markerRec, markerDesc].forEach((marker) => {
          marker.addListener("click", () => setSelectedId(c.id));
          markersRef.current.push(marker);
        });
      }

      if (showLines) {
        const lineOne = new window.google.maps.Polyline({
          map: googleMapRef.current,
          path: [perda, recuperacao],
          strokeColor: active ? "#67e8f9" : "#64748b",
          strokeOpacity: 0.95,
          strokeWeight: active ? 4 : 3,
          icons: [{
            icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 3 },
            offset: "0",
            repeat: "14px",
          }],
        });

        const lineTwo = new window.google.maps.Polyline({
          map: googleMapRef.current,
          path: [descarte, recuperacao],
          strokeColor: active ? "#facc15" : "#475569",
          strokeOpacity: 0.85,
          strokeWeight: active ? 3 : 2,
        });

        polylinesRef.current.push(lineOne, lineTwo);
      }

      bounds.extend(perda);
      bounds.extend(recuperacao);
      bounds.extend(descarte);
    });

    if (!bounds.isEmpty()) {
      googleMapRef.current.fitBounds(bounds, 60);
    }
  }, [filteredCases, selected?.id, showEvents, showLines]);

  useEffect(() => {
    if (!kmlLayersRef.current.territorial) return;
    kmlLayersRef.current.territorial.setMap(showAreas ? googleMapRef.current : null);
  }, [showAreas]);

  useEffect(() => {
    if (!kmlLayersRef.current.intelligence) return;
    kmlLayersRef.current.intelligence.setMap(showIntelligenceKml ? googleMapRef.current : null);
  }, [showIntelligenceKml]);

  return (
    <div className="min-h-screen bg-[#081018] text-white">
      <div className="grid min-h-screen grid-cols-12">
        <aside className="col-span-12 border-b border-cyan-900/30 bg-[#07111a] p-5 lg:col-span-3 lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">Mapa de Inteligência</p>
            <h1 className="mt-2 text-2xl font-bold">V3 Real • Perda x Recuperação</h1>
            <p className="mt-2 text-sm text-slate-400">
              Painel com mapa real, eventos operacionais e camadas KML/KMZ públicas.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Camadas</p>
              <LayerButton icon={<ShieldAlert size={14} />} label="Áreas territoriais" active={showAreas} onClick={() => setShowAreas((v) => !v)} />
              <LayerButton icon={<MapPin size={14} />} label="Eventos" active={showEvents} onClick={() => setShowEvents((v) => !v)} />
              <LayerButton icon={<Route size={14} />} label="Linhas de vínculo" active={showLines} onClick={() => setShowLines((v) => !v)} />
              <LayerButton icon={<Layers3 size={14} />} label="Seu KML base" active={showIntelligenceKml} onClick={() => setShowIntelligenceKml((v) => !v)} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                <Search size={14} /> Busca rápida
              </label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caso, modelo, bairro..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none placeholder:text-slate-500"
              />
            </div>

            <SelectCard label="Modelo do veículo" icon={<Car size={14} />} value={modelo} onChange={setModelo} options={MODELOS} />
            <SelectCard label="Tipo de ocorrência" icon={<Filter size={14} />} value={ocorrencia} onChange={setOcorrencia} options={OCORRENCIAS} />
            <SelectCard label="Cluster / eixo" icon={<Layers3 size={14} />} value={cluster} onChange={setCluster} options={CLUSTERS} />

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Casos" value={String(stats.total)} accent="cyan" />
              <StatCard label="Média km" value={String(stats.mediaKm)} accent="amber" />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Leitura automática</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {stats.total > 0
                  ? Os filtros atuais mostram ${stats.total} caso(s), com distância média de ${stats.mediaKm} km entre perda e recuperação. O principal destino recorrente é ${stats.destino}${stats.destinoQtd ? `, citado em ${stats.destinoQtd} registro(s) : ""}.`
                  : "Nenhum caso encontrado para os filtros aplicados."}
              </p>
            </div>

            <div className="rounded-2xl border border-red-900/30 bg-red-950/20 p-4">
              <p className="text-xs uppercase tracking-wide text-red-300">Leitura territorial</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{areaInsight}</p>
            </div>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-9">
          <header className="border-b border-slate-800 bg-[#08131d] px-5 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Painel de Correlação Geográfica</h2>
                <p className="text-sm text-slate-400">
                  KML base + camada territorial + vínculos operacionais sobre mapa real.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Perda', 'Recuperação', 'Descarte', 'KML base', 'Área territorial'].map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div className="grid gap-5 p-5 xl:grid-cols-[1.45fr,0.85fr]">
            <section className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 text-xs text-slate-300">
                <div>
                  <span className="font-semibold text-cyan-300">Modo real</span>
                  <span className="ml-2">Google Maps + KmlLayer</span>
                </div>
                <div className="flex gap-4">
                  <span>Base: SP</span>
                  <span>Territorial: RJ</span>
                </div>
              </div>

              <div className="relative h-[720px] w-full bg-slate-950">
                <div ref={mapRef} className="h-full w-full" />

                {!mapReady && !mapError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/85">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-sm text-slate-300">
                      Carregando mapa...
                    </div>
                  </div>
                )}

                {mapError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/85 p-6">
                    <div className="max-w-lg rounded-2xl border border-red-900/40 bg-red-950/30 p-5 text-sm text-slate-200">
                      <p className="font-semibold text-red-300">Falha ao iniciar o mapa</p>
                      <p className="mt-2 leading-6">{mapError}</p>
                      <p className="mt-3 text-slate-400">
                        Defina sua chave em <code>window.GOOGLE_MAPS_API_KEY</code> ou substitua a constante no código.
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute left-4 top-4 rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-xs text-slate-300">
                  <p className="font-semibold text-cyan-300">Legenda</p>
                  <p className="mt-2">P = perda</p>
                  <p>R = recuperação</p>
                  <p>D = descarte</p>
                  <p>KML = camadas públicas</p>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-xl">
                <h3 className="text-lg font-semibold">Caso selecionado</h3>
                {selected ? (
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <InfoCard label="Caso" value={selected.id} />
                    <div className="grid grid-cols-2 gap-3">
                      <InfoCard label="Veículo" value={${selected.marca} ${selected.modelo}} />
                      <InfoCard label="Ocorrência" value={selected.ocorrencia} />
                    </div>
                    <ColorInfoCard tone="cyan" label="Perda" bairro={selected.perda.bairro} coords={${selected.perda.lat}, ${selected.perda.lng}} />
                    <ColorInfoCard tone="emerald" label="Recuperação" bairro={selected.recuperacao.bairro} coords={${selected.recuperacao.lat}, ${selected.recuperacao.lng}} />
                    <ColorInfoCard tone="yellow" label="Descarte" bairro={selected.descarte.bairro} coords={${selected.descarte.lat}, ${selected.descarte.lng}} />
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Leitura investigativa</p>
                      <p className="mt-2 leading-6 text-slate-300">
                        Caso inserido no cluster <span className="font-semibold text-white">{selected.cluster}</span>, com padrão de deslocamento entre <span className="font-semibold text-white">{selected.perda.bairro}</span> e <span className="font-semibold text-white">{selected.recuperacao.bairro}</span>. O descarte intermediário em <span className="font-semibold text-white">{selected.descarte.bairro}</span> reforça a leitura de vínculo operacional.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-400">Nenhum caso disponível.</p>
                )}
              </div>

              <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-xl">
                <h3 className="text-lg font-semibold">Casos filtrados</h3>
                <div className="mt-4 space-y-3">
                  {filteredCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={w-full rounded-2xl border p-4 text-left transition ${selected?.id === c.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">{c.id} • {c.modelo}</p>
                          <p className="mt-1 text-sm text-slate-400">{c.perda.bairro} → {c.recuperacao.bairro}</p>
                        </div>
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{c.cluster}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function LayerButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm">
      <span className="flex items-center gap-2">{icon} {label}</span>
      {active ? <Eye size={16} className="text-cyan-300" /> : <EyeOff size={16} className="text-slate-500" />}
    </button>
  );
}

function SelectCard({ label, icon, value, onChange, options }: { label: string; icon: React.ReactNode; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        {icon} {label}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: "cyan" | "amber" }) {
  const tones = {
    cyan: "border-cyan-900/30 bg-cyan-950/20 text-cyan-300",
    amber: "border-amber-900/30 bg-amber-950/20 text-amber-300",
  };
  return (
    <div className={rounded-2xl border p-4 ${tones[accent]}}>
      <p className="text-xs uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function ColorInfoCard({ tone, label, bairro, coords }: { tone: "cyan" | "emerald" | "yellow"; label: string; bairro: string; coords: string }) {
  const tones = {
    cyan: "border-cyan-900/30 bg-cyan-950/20 text-cyan-300",
    emerald: "border-emerald-900/30 bg-emerald-950/20 text-emerald-300",
    yellow: "border-yellow-900/30 bg-yellow-950/20 text-yellow-300",
  };
  return (
    <div className={rounded-2xl border p-4 ${tones[tone]}}>
      <p className="text-xs uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-white">{bairro}</p>
      <p className="text-xs text-slate-400">{coords}</p>
    </div>
  );
}

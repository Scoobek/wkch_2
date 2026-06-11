import Script from "next/script";

const DETECT_SCRIPT = `(function(){
  var s=localStorage.getItem('wkch-locale');
  if(s==='pl'||s==='en'){location.replace('/'+s);return;}
  var pl=(navigator.languages||[navigator.language]).some(function(l){return l.toLowerCase().startsWith('pl');});
  location.replace(pl?'/pl':'/en');
})();`;

export default function RootPage() {
    return (
        <>
            <Script id="locale-detect" strategy="beforeInteractive">
                {DETECT_SCRIPT}
            </Script>
            <div style={{ position: "fixed", inset: 0, background: "#fdfcf8" }} />
        </>
    );
}

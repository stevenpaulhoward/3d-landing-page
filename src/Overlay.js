export function Overlay() {
    return (
      <>
        <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '15px', textAlign: 'left' }}>
          Luma Labs
          <br />
          Design Challenge
        </div>
        <div style={{ position: 'absolute', top: 40, right: 40, fontSize: '15px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
          Steven Howard
          <br />
          12/17/23
        </div>
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', right: '5%', fontSize: '18px', textAlign: 'center', padding: '0, 10px' }}>
          Select a model to focus it,
          <br />
          then scroll to inspect.
        </div>
      </>
    )
  }
  
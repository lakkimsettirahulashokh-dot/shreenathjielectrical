import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle, 
  Zap, 
  Building2, 
  Cpu, 
  Layers, 
  RotateCcw,
  Send,
  HelpCircle,
  Edit3
} from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';

// Building types as requested
const BUILDING_TYPES = [
  'Home',
  'Apartment Building',
  'Small Office',
  'Large Office',
  'Shop',
  'Showroom',
  'Restaurant',
  'Hotel',
  'School / College',
  'Hospital',
  'Workshop',
  'Factory',
  'Warehouse',
  'Commercial Building',
  'Industrial Building',
  'Other'
];

// Presets for quick equipment adding
const EQUIPMENT_PRESETS = {
  Home: [
    { name: 'LED Lights', qty: 15, power: 15, unit: 'W', voltage: 230, hours: 6, duty: 0.8 },
    { name: 'Ceiling Fans', qty: 5, power: 75, unit: 'W', voltage: 230, hours: 10, duty: 0.8 },
    { name: 'Air Conditioner (1.5 Ton)', qty: 2, power: 1800, unit: 'W', voltage: 230, hours: 8, duty: 0.7 },
    { name: 'Refrigerator', qty: 1, power: 300, unit: 'W', voltage: 230, hours: 24, duty: 0.5 },
    { name: 'Water Pump (1 HP)', qty: 1, power: 1, unit: 'HP', voltage: 230, hours: 1, duty: 1.0 }
  ],
  Office: [
    { name: 'Desktop Computers', qty: 10, power: 250, unit: 'W', voltage: 230, hours: 9, duty: 0.9 },
    { name: 'Printers & Photocopier', qty: 2, power: 600, unit: 'W', voltage: 230, hours: 3, duty: 0.5 },
    { name: 'Air Conditioning (Central/Split)', qty: 4, power: 2200, unit: 'W', voltage: 230, hours: 9, duty: 0.8 },
    { name: 'Lighting & Networking', qty: 1, power: 800, unit: 'W', voltage: 230, hours: 10, duty: 1.0 },
    { name: 'UPS System', qty: 1, power: 3000, unit: 'W', voltage: 230, hours: 24, duty: 0.8 }
  ],
  Workshop: [
    { name: 'Induction Motor', qty: 2, power: 5, unit: 'HP', voltage: 415, hours: 8, duty: 0.8 },
    { name: 'Welding Machine', qty: 1, power: 8, unit: 'kW', voltage: 415, hours: 4, duty: 0.6 },
    { name: 'Air Compressor (3 HP)', qty: 1, power: 3, unit: 'HP', voltage: 415, hours: 6, duty: 0.7 },
    { name: 'Lathe / Drill / Grinder', qty: 2, power: 2, unit: 'HP', voltage: 415, hours: 5, duty: 0.7 }
  ],
  Factory: [
    { name: 'Production Line Heavy Motors', qty: 4, power: 15, unit: 'HP', voltage: 415, hours: 16, duty: 0.85 },
    { name: 'Industrial Screw Compressor', qty: 1, power: 20, unit: 'HP', voltage: 415, hours: 16, duty: 0.9 },
    { name: 'Hydraulic Pumps', qty: 2, power: 10, unit: 'HP', voltage: 415, hours: 12, duty: 0.8 },
    { name: 'CNC Machine & Heating', qty: 2, power: 12, unit: 'kW', voltage: 415, hours: 14, duty: 0.75 }
  ]
};

const VOLTAGE_OPTIONS = [
  '12 V', '24 V', '48 V', '110 V', '120 V', 
  '220 V', '230 V', '240 V', '380 V', '400 V', '415 V', 
  'Custom', "I Don't Know"
];

export default function PowerRequirement() {
  // Step 1: Building Type (Default empty, no fixed auto load assigned)
  const [buildingType, setBuildingType] = useState('Workshop');

  // Step 2: Equipment List
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, name: 'Main Induction Motor', qty: 2, power: 5, unit: 'HP', voltage: 415, hours: 8, duty: 0.8 },
    { id: 2, name: 'Air Compressor', qty: 1, power: 3, unit: 'HP', voltage: 415, hours: 6, duty: 0.7 },
    { id: 3, name: 'Welding Station', qty: 1, power: 7.5, unit: 'kW', voltage: 415, hours: 4, duty: 0.6 }
  ]);

  // Step 3: Total Power mode: 'calculated' (from equipment) or 'manual'
  const [powerMode, setPowerMode] = useState('calculated');
  const [manualPowerValue, setManualPowerValue] = useState(15);
  const [manualPowerUnit, setManualPowerUnit] = useState('kW');

  // Step 4: Voltage
  const [voltageSelection, setVoltageSelection] = useState('415 V');
  const [customVoltage, setCustomVoltage] = useState(415);

  // Step 5: Current Type: 'AC', 'DC', 'Not Sure'
  const [currentType, setCurrentType] = useState('AC');

  // Step 6: Phase: 'Three Phase', 'Single Phase', 'Not Sure'
  const [phase, setPhase] = useState('Three Phase');

  // Step 7: Power Factor (0.50 to 1.00)
  const [powerFactor, setPowerFactor] = useState(0.85);
  const [isPfEstimated, setIsPfEstimated] = useState(false);

  // Step 9: Review & Contact details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocation, setCustomerLocation] = useState('Rajkot');
  const [additionalRequirement, setAdditionalRequirement] = useState('');
  const [submissionSaved, setSubmissionSaved] = useState(false);
  const [lastWaUrl, setLastWaUrl] = useState('');

  // Unit conversion helper to Watts
  const convertToWatts = (value, unit) => {
    const val = parseFloat(value) || 0;
    switch (unit) {
      case 'W': return val;
      case 'kW': return val * 1000;
      case 'MW': return val * 1000000;
      case 'HP': return val * 746; // 1 HP = 746 W
      default: return val * 1000;
    }
  };

  // Step 3 calculation: Estimated Connected Load from equipment
  const calculatedLoadWatts = useMemo(() => {
    return equipmentList.reduce((acc, item) => {
      const itemWatts = convertToWatts(item.power, item.unit);
      const qty = parseFloat(item.qty) || 1;
      const duty = parseFloat(item.duty) || 1.0;
      return acc + (itemWatts * qty * duty);
    }, 0);
  }, [equipmentList]);

  // Effective Power in Watts
  const effectivePowerWatts = useMemo(() => {
    if (powerMode === 'calculated') {
      return calculatedLoadWatts;
    } else {
      return convertToWatts(manualPowerValue, manualPowerUnit);
    }
  }, [powerMode, calculatedLoadWatts, manualPowerValue, manualPowerUnit]);

  // Effective Voltage in Volts
  const effectiveVoltage = useMemo(() => {
    if (voltageSelection === 'Custom') {
      return parseFloat(customVoltage) || 230;
    }
    if (voltageSelection === "I Don't Know") {
      // Intelligently infer based on phase or default to 230V / 415V
      return phase === 'Three Phase' ? 415 : 230;
    }
    return parseFloat(voltageSelection.replace(' V', '')) || 230;
  }, [voltageSelection, customVoltage, phase]);

  // Effective Current Type & Phase
  const effectiveCurrentType = currentType === 'Not Sure' ? 'AC' : currentType;
  const effectivePhase = (effectiveCurrentType === 'AC') 
    ? (phase === 'Not Sure' ? (effectiveVoltage >= 380 ? 'Three Phase' : 'Single Phase') : phase)
    : 'N/A (DC)';

  // Step 8: CALCULATE CURRENT
  // Single Phase AC: I = P / (V × PF)
  // Three Phase AC: I = P / (√3 × V × PF)
  // DC: I = P / V
  const calculatedCurrentAmps = useMemo(() => {
    const P = effectivePowerWatts;
    const V = effectiveVoltage;
    const PF = Math.max(0.5, Math.min(1.0, parseFloat(powerFactor) || 0.85));

    if (V <= 0 || P <= 0) return 0;

    if (effectiveCurrentType === 'DC') {
      return P / V;
    }

    if (effectivePhase === 'Single Phase') {
      return P / (V * PF);
    } else {
      // Three Phase AC
      const sqrt3 = 1.73205;
      return P / (sqrt3 * V * PF);
    }
  }, [effectivePowerWatts, effectiveVoltage, effectiveCurrentType, effectivePhase, powerFactor]);

  // Add equipment item
  const handleAddEquipment = (preset) => {
    const newItem = preset || {
      id: Date.now(),
      name: 'New Equipment',
      qty: 1,
      power: 1,
      unit: 'kW',
      voltage: effectiveVoltage,
      hours: 8,
      duty: 0.8
    };
    setEquipmentList([...equipmentList, { ...newItem, id: Date.now() }]);
  };

  const handleRemoveEquipment = (id) => {
    setEquipmentList(equipmentList.filter(item => item.id !== id));
  };

  const handleUpdateEquipment = (id, field, value) => {
    setEquipmentList(equipmentList.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Step 10: Secure Save & Send Requirement via WhatsApp
  const handleSendRequirement = (e) => {
    e.preventDefault();

    // Secure local save (No exposed database keys)
    const requirementData = {
      timestamp: new Date().toISOString(),
      buildingType,
      equipmentCount: equipmentList.length,
      equipmentSummary: equipmentList.map(i => `${i.qty}x ${i.name} (${i.power} ${i.unit})`).join(', '),
      totalPowerKW: (effectivePowerWatts / 1000).toFixed(2),
      voltage: `${effectiveVoltage}V`,
      currentType: effectiveCurrentType,
      phase: effectivePhase,
      powerFactor: powerFactor,
      calculatedCurrent: `${calculatedCurrentAmps.toFixed(1)} A`,
      customerName: customerName || 'Valued Customer',
      customerPhone: customerPhone || 'Not Provided',
      location: customerLocation,
      additionalRequirement: additionalRequirement || 'None'
    };

    try {
      const existingHistory = JSON.parse(localStorage.getItem('se_requirements_history') || '[]');
      existingHistory.push(requirementData);
      localStorage.setItem('se_requirements_history', JSON.stringify(existingHistory));
      setSubmissionSaved(true);
    } catch (err) {
      console.error('Storage note:', err);
    }

    // Format WhatsApp message exactly as requested
    const equipmentText = equipmentList.length > 0
      ? equipmentList.map(eq => `• ${eq.qty}x ${eq.name} (${eq.power} ${eq.unit}, ${eq.voltage}V)`).join('\n')
      : 'None specified';

    const message = `NEW POWER REQUIREMENT — SHREENATHJI ELECTRICAL

Building Type:
${buildingType}

Equipment / Machines:
${equipmentText}

Total Power:
${(effectivePowerWatts / 1000).toFixed(2)} kW (${(effectivePowerWatts / 746).toFixed(1)} HP)

Voltage:
${effectiveVoltage} V

Current Type:
${effectiveCurrentType}

Phase:
${effectivePhase}

Power Factor:
${effectiveCurrentType === 'DC' ? '1.0 (DC)' : parseFloat(powerFactor).toFixed(2)}

Calculated Current:
${calculatedCurrentAmps.toFixed(1)} A

Additional Requirement:
${additionalRequirement.trim() || 'None'}

Submitted From:
SHREENATHJI ELECTRICAL WEBSITE`;

    const waUrl = `https://wa.me/919824075278?text=${encodeURIComponent(message)}`;
    setLastWaUrl(waUrl);
    window.open(waUrl, '_blank');
  };

  return (
    <main>
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Power Requirement</span>
        </div>
      </nav>

      {/* Page Header */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-border)', paddingBottom: '36px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-tag">Interactive Engineering Tool</span>
            <h1 className="section-title">ELECTRICAL REQUIREMENT CALCULATOR</h1>
            <p className="section-subtitle">
              Calculate your preliminary electrical connected load, operating current, and panel specifications across 10 structured engineering steps.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Body */}
      <section className="section-padding">
        <div className="container calc-wrapper">
          <div className="calc-card">
            <div className="calc-header">
              <span className="calc-step-indicator">Steps 1 to 10</span>
              <h2 className="calc-header-title">Electrical Power &amp; Current Estimator</h2>
              <p style={{ color: '#D3DBE2', fontSize: '0.9rem', marginTop: '4px' }}>
                Follow each step below. Inputs dynamically calculate the estimated load and current in real time.
              </p>
            </div>

            <div className="calc-body">
              {/* ==============================================================
                  STEP 1: BUILDING TYPE
                  ============================================================== */}
              <div style={{ marginBottom: '36px' }}>
                <h3 className="calc-section-title">
                  <span className="calc-step-indicator" style={{ margin: 0 }}>Step 1</span>
                  Select Building Type
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  Select your facility or building structure. (Note: Power is calculated strictly from your equipment and load, never blindly guessed).
                </p>
                <div className="options-grid-buildings">
                  {BUILDING_TYPES.map((bType) => (
                    <button
                      key={bType}
                      type="button"
                      className={`option-select-btn ${buildingType === bType ? 'selected' : ''}`}
                      onClick={() => setBuildingType(bType)}
                    >
                      {bType}
                    </button>
                  ))}
                </div>
              </div>

              {/* ==============================================================
                  STEP 2: EQUIPMENT / MACHINES
                  ============================================================== */}
              <div style={{ marginBottom: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                  <h3 className="calc-section-title" style={{ margin: 0 }}>
                    <span className="calc-step-indicator" style={{ margin: 0 }}>Step 2</span>
                    Equipment &amp; Machines List
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleAddEquipment()}
                    className="btn btn-primary btn-sm"
                    style={{ gap: '6px' }}
                  >
                    <Plus size={16} /> Add Equipment Row
                  </button>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  Specify the actual nameplate ratings of the motors, machines, or appliances operating on your site.
                </p>

                {/* Quick Preset Buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px', background: 'var(--color-surface-soft)', padding: '10px 14px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--brand-charcoal)', textTransform: 'uppercase' }}>
                    Quick Preset Kits:
                  </span>
                  {Object.keys(EQUIPMENT_PRESETS).map(presetKey => (
                    <button
                      key={presetKey}
                      type="button"
                      onClick={() => {
                        setEquipmentList(EQUIPMENT_PRESETS[presetKey].map((item, idx) => ({ ...item, id: Date.now() + idx })));
                      }}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.8rem', padding: '4px 10px', minHeight: '30px' }}
                    >
                      + {presetKey} Kit
                    </button>
                  ))}
                </div>

                {/* Desktop Equipment Table */}
                <div className="equipment-table-wrap equipment-table-desktop">
                  <table className="equipment-table">
                    <thead>
                      <tr>
                        <th style={{ width: '32%' }}>Equipment / Machine</th>
                        <th style={{ width: '12%' }}>Quantity</th>
                        <th style={{ width: '18%' }}>Rated Power</th>
                        <th style={{ width: '14%' }}>Unit</th>
                        <th style={{ width: '14%' }}>Simultaneous %</th>
                        <th style={{ width: '10%', textAlign: 'center' }}>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {equipmentList.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              type="text"
                              className="equipment-input"
                              value={item.name}
                              onChange={(e) => handleUpdateEquipment(item.id, 'name', e.target.value)}
                              placeholder="e.g. Induction Motor"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              className="equipment-input"
                              value={item.qty}
                              onChange={(e) => handleUpdateEquipment(item.id, 'qty', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              className="equipment-input"
                              value={item.power}
                              onChange={(e) => handleUpdateEquipment(item.id, 'power', e.target.value)}
                            />
                          </td>
                          <td>
                            <select
                              className="equipment-input"
                              value={item.unit}
                              onChange={(e) => handleUpdateEquipment(item.id, 'unit', e.target.value)}
                            >
                              <option value="W">W</option>
                              <option value="kW">kW</option>
                              <option value="HP">HP</option>
                              <option value="MW">MW</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="equipment-input"
                              value={item.duty}
                              onChange={(e) => handleUpdateEquipment(item.id, 'duty', e.target.value)}
                            >
                              <option value="1.0">100% (Continuous)</option>
                              <option value="0.8">80% (Standard)</option>
                              <option value="0.6">60% (Intermittent)</option>
                              <option value="0.4">40% (Standby)</option>
                            </select>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              onClick={() => handleRemoveEquipment(item.id)}
                              className="btn-remove-row"
                              title="Delete row"
                              aria-label="Delete equipment row"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Equipment Cards (Touch-Friendly, Zero Horizontal Scroll) */}
                <div className="equipment-cards-mobile" aria-label="Equipment list for mobile">
                  {equipmentList.map((item, idx) => (
                    <div key={item.id} className="equipment-card-mobile">
                      <div className="equipment-card-header">
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--brand-orange)', textTransform: 'uppercase' }}>
                          #{idx + 1} Equipment
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEquipment(item.id)}
                          className="btn-remove-row"
                          title="Delete equipment item"
                          aria-label={`Delete ${item.name || 'item'}`}
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <label className="equipment-card-label">Machine / Appliance Name</label>
                        <input
                          type="text"
                          className="equipment-input"
                          value={item.name}
                          onChange={(e) => handleUpdateEquipment(item.id, 'name', e.target.value)}
                          placeholder="e.g. Induction Motor"
                          style={{ width: '100%', minHeight: '44px' }}
                        />
                      </div>

                      <div className="equipment-card-row-grid">
                        <div>
                          <label className="equipment-card-label">Qty</label>
                          <input
                            type="number"
                            min="1"
                            className="equipment-input"
                            value={item.qty}
                            onChange={(e) => handleUpdateEquipment(item.id, 'qty', e.target.value)}
                            style={{ minHeight: '44px', textAlign: 'center' }}
                          />
                        </div>
                        <div>
                          <label className="equipment-card-label">Power</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            className="equipment-input"
                            value={item.power}
                            onChange={(e) => handleUpdateEquipment(item.id, 'power', e.target.value)}
                            style={{ minHeight: '44px', textAlign: 'center' }}
                          />
                        </div>
                        <div>
                          <label className="equipment-card-label">Unit</label>
                          <select
                            className="equipment-input"
                            value={item.unit}
                            onChange={(e) => handleUpdateEquipment(item.id, 'unit', e.target.value)}
                            style={{ minHeight: '44px' }}
                          >
                            <option value="W">W</option>
                            <option value="kW">kW</option>
                            <option value="HP">HP</option>
                            <option value="MW">MW</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="equipment-card-label">Simultaneous Operation (Diversity Factor)</label>
                        <select
                          className="equipment-input"
                          value={item.duty}
                          onChange={(e) => handleUpdateEquipment(item.id, 'duty', e.target.value)}
                          style={{ width: '100%', minHeight: '44px' }}
                        >
                          <option value="1.0">100% (Continuous Duty)</option>
                          <option value="0.8">80% (Standard Duty)</option>
                          <option value="0.6">60% (Intermittent Duty)</option>
                          <option value="0.4">40% (Standby / Periodic)</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==============================================================
                  STEP 3: POWER
                  ============================================================== */}
              <div style={{ marginBottom: '36px' }}>
                <h3 className="calc-section-title">
                  <span className="calc-step-indicator" style={{ margin: 0 }}>Step 3</span>
                  Connected Power (W / kW / MW / HP)
                </h3>

                <div className="load-summary-banner">
                  <div>
                    <span className="load-summary-label">ESTIMATED CONNECTED LOAD (FROM EQUIPMENT):</span>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      Sum of {(equipmentList.length)} equipment items factored by operational duty
                    </div>
                  </div>
                  <div className="load-summary-value">
                    {(calculatedLoadWatts / 1000).toFixed(2)} kW
                    <span style={{ fontSize: '1rem', color: 'var(--brand-charcoal)', marginLeft: '8px' }}>
                      ({(calculatedLoadWatts / 746).toFixed(1)} HP)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                    <input
                      type="radio"
                      name="powerMode"
                      checked={powerMode === 'calculated'}
                      onChange={() => setPowerMode('calculated')}
                    />
                    Use Estimated Load from Equipment ({ (calculatedLoadWatts / 1000).toFixed(2) } kW)
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                    <input
                      type="radio"
                      name="powerMode"
                      checked={powerMode === 'manual'}
                      onChange={() => setPowerMode('manual')}
                    />
                    Specify Known Total Power Manually
                  </label>
                </div>

                {powerMode === 'manual' && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '14px', maxWidth: '380px' }}>
                    <input
                      type="number"
                      step="0.1"
                      className="equipment-input"
                      value={manualPowerValue}
                      onChange={(e) => setManualPowerValue(e.target.value)}
                      placeholder="Enter Power Value"
                    />
                    <select
                      className="equipment-input"
                      value={manualPowerUnit}
                      onChange={(e) => setManualPowerUnit(e.target.value)}
                      style={{ width: '110px' }}
                    >
                      <option value="W">W</option>
                      <option value="kW">kW</option>
                      <option value="MW">MW</option>
                      <option value="HP">HP</option>
                    </select>
                  </div>
                )}
              </div>

              {/* ==============================================================
                  STEP 4: VOLTAGE
                  ============================================================== */}
              <div style={{ marginBottom: '36px' }}>
                <h3 className="calc-section-title">
                  <span className="calc-step-indicator" style={{ margin: 0 }}>Step 4</span>
                  Operating Voltage
                </h3>
                <div className="options-grid-buildings">
                  {VOLTAGE_OPTIONS.map((volt) => (
                    <button
                      key={volt}
                      type="button"
                      className={`option-select-btn ${voltageSelection === volt ? 'selected' : ''}`}
                      onClick={() => setVoltageSelection(volt)}
                    >
                      {volt}
                    </button>
                  ))}
                </div>

                {voltageSelection === 'Custom' && (
                  <div style={{ marginTop: '12px', maxWidth: '320px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                      Enter Custom Voltage (Volts):
                    </label>
                    <input
                      type="number"
                      className="equipment-input"
                      value={customVoltage}
                      onChange={(e) => setCustomVoltage(e.target.value)}
                      placeholder="e.g. 440"
                    />
                  </div>
                )}

                {voltageSelection === "I Don't Know" && (
                  <p style={{ fontSize: '0.88rem', color: 'var(--brand-orange)', fontWeight: '600', marginTop: '8px' }}>
                    * Using standard Indian utility standard voltage: {phase === 'Three Phase' ? '415 V (Three Phase)' : '230 V (Single Phase)'}.
                  </p>
                )}
              </div>

              {/* ==============================================================
                  STEP 5: CURRENT TYPE & STEP 6: PHASE
                  ============================================================== */}
              <div className="calc-step56-grid">
                {/* Step 5 */}
                <div>
                  <h3 className="calc-section-title">
                    <span className="calc-step-indicator" style={{ margin: 0 }}>Step 5</span>
                    Current Type
                  </h3>
                  <div className="calc-option-btn-group">
                    {['AC', 'DC', 'Not Sure'].map((cType) => (
                      <button
                        key={cType}
                        type="button"
                        className={`option-select-btn ${currentType === cType ? 'selected' : ''}`}
                        onClick={() => setCurrentType(cType)}
                      >
                        {cType}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 6 */}
                <div>
                  <h3 className="calc-section-title">
                    <span className="calc-step-indicator" style={{ margin: 0 }}>Step 6</span>
                    Phase (For AC)
                  </h3>
                  <div className="calc-option-btn-group">
                    {['Single Phase', 'Three Phase', 'Not Sure'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        disabled={currentType === 'DC'}
                        className={`option-select-btn ${phase === p ? 'selected' : ''}`}
                        onClick={() => setPhase(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ==============================================================
                  STEP 7: POWER FACTOR (0.50 – 1.00)
                  ============================================================== */}
              {effectiveCurrentType === 'AC' && (
                <div style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 className="calc-section-title" style={{ margin: 0 }}>
                      <span className="calc-step-indicator" style={{ margin: 0 }}>Step 7</span>
                      Power Factor (PF) (0.50 – 1.00)
                    </h3>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.2rem', color: 'var(--brand-orange)' }}>
                      PF: {parseFloat(powerFactor).toFixed(2)}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                    Standard industrial inductive loads typically operate around 0.80 – 0.85 PF before APFC correction.
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input
                      type="range"
                      min="0.50"
                      max="1.00"
                      step="0.01"
                      value={powerFactor}
                      onChange={(e) => {
                        setPowerFactor(e.target.value);
                        setIsPfEstimated(false);
                      }}
                      style={{ flexGrow: 1, accentColor: 'var(--brand-orange)', height: '8px' }}
                    />
                    <input
                      type="number"
                      min="0.50"
                      max="1.00"
                      step="0.01"
                      value={powerFactor}
                      onChange={(e) => {
                        setPowerFactor(e.target.value);
                        setIsPfEstimated(false);
                      }}
                      className="equipment-input"
                      style={{ width: '90px', textAlign: 'center', fontWeight: '700' }}
                    />
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setPowerFactor(0.85);
                        setIsPfEstimated(true);
                      }}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                    >
                      I Don't Know (Use Preliminary Estimate: 0.85)
                    </button>
                    {isPfEstimated && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--brand-orange)', marginLeft: '10px', fontWeight: '600' }}>
                        * Preliminary estimate: 0.85
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* ==============================================================
                  STEP 8: RESULT CARD (CALCULATED CURRENT: XX A)
                  ============================================================== */}
              <div className="calc-result-box" aria-label="Dynamic Calculation Results">
                <div className="result-header">
                  <span className="result-title">
                    <Zap size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                    Step 8: Dynamic Electrical Calculation
                  </span>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px' }}>
                    Real-time Formula: {effectiveCurrentType === 'DC' ? 'I = P / V' : (effectivePhase === 'Single Phase' ? 'I = P / (V × PF)' : 'I = P / (√3 × V × PF)')}
                  </span>
                </div>

                <div className="result-current-display">
                  <div className="result-current-label">CALCULATED FULL-LOAD CURRENT:</div>
                  <div className="result-current-value">
                    {calculatedCurrentAmps.toFixed(1)}
                    <span>A</span>
                  </div>
                </div>

                <div className="result-details-grid">
                  <div className="result-detail-item">
                    <span className="res-key">Building</span>
                    <span className="res-val">{buildingType}</span>
                  </div>
                  <div className="result-detail-item">
                    <span className="res-key">Equipment Items</span>
                    <span className="res-val">{equipmentList.length} Units</span>
                  </div>
                  <div className="result-detail-item">
                    <span className="res-key">Connected Power</span>
                    <span className="res-val">{(effectivePowerWatts / 1000).toFixed(2)} kW</span>
                  </div>
                  <div className="result-detail-item">
                    <span className="res-key">Operating Voltage</span>
                    <span className="res-val">{effectiveVoltage} V</span>
                  </div>
                  <div className="result-detail-item">
                    <span className="res-key">Current Type &amp; Phase</span>
                    <span className="res-val">{effectiveCurrentType} — {effectivePhase}</span>
                  </div>
                  <div className="result-detail-item">
                    <span className="res-key">Power Factor (PF)</span>
                    <span className="res-val">{effectiveCurrentType === 'DC' ? '1.0 (DC)' : parseFloat(powerFactor).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* ==============================================================
                  SAFETY NOTICE (MANDATORY EXACT WORDING)
                  ============================================================== */}
              <div className="safety-notice-box">
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <AlertTriangle size={24} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>IMPORTANT ELECTRICAL SAFETY NOTICE:</strong>
                    “Calculated current is a preliminary estimate based on the information entered. Actual electrical current may vary depending on equipment ratings, operating conditions, efficiency, power factor and starting current. Final panel rating, breaker selection, cable sizing, protection, busbar sizing, earthing and installation must be verified by a qualified electrical professional.”
                  </div>
                </div>
              </div>

              {/* ==============================================================
                  STEP 9: REVIEW REQUIREMENT & STEP 10: SEND REQUIREMENT
                  ============================================================== */}
              <form onSubmit={handleSendRequirement} style={{ marginTop: '40px', borderTop: '2px solid var(--color-border)', paddingTop: '32px' }}>
                <h3 className="calc-section-title">
                  <span className="calc-step-indicator" style={{ margin: 0 }}>Step 9 &amp; 10</span>
                  Review Requirement &amp; Send to Shreenathji Electrical
                </h3>

                <div className="calc-contact-grid">
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
                      Your / Company Name
                    </label>
                    <input
                      type="text"
                      className="equipment-input"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Patel Engineering"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
                      Contact Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      className="equipment-input"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 98240XXXXX"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
                      City / Site Location
                    </label>
                    <input
                      type="text"
                      className="equipment-input"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      placeholder="e.g. Rajkot, Gondal, Shapar"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
                    Additional Requirement / Notes (Panel Type, Enclosure, Breaker preference, etc.)
                  </label>
                  <textarea
                    rows="3"
                    className="equipment-input"
                    value={additionalRequirement}
                    onChange={(e) => setAdditionalRequirement(e.target.value)}
                    placeholder="Specify if you require MCC, PCC, APFC panel, outdoor weatherproof rating, Siemens/Schneider switchgear, etc."
                  />
                </div>

                {submissionSaved && (
                  <div 
                    role="status"
                    style={{ 
                      background: '#DCFCE7', 
                      border: '1.5px solid #86EFAC', 
                      color: '#15803D', 
                      padding: '16px', 
                      borderRadius: '8px', 
                      marginBottom: '20px', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px', 
                      fontSize: '0.95rem',
                      lineHeight: '1.5'
                    }}
                  >
                    <CheckCircle size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#16A34A' }} />
                    <div>
                      <strong style={{ color: '#166534', display: 'block', fontSize: '1rem', marginBottom: '4px' }}>
                        Your requirement is ready to send on WhatsApp.
                      </strong>
                      <div style={{ fontSize: '0.88rem', color: '#14532D' }}>
                        WhatsApp should have opened in a new tab/app. If it didn’t open automatically,{' '}
                        <a 
                          href={lastWaUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: '#16A34A', fontWeight: '800', textDecoration: 'underline' }}
                        >
                          click here to open WhatsApp directly
                        </a>.
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ 
                      fontSize: '1rem', 
                      padding: '16px 32px',
                      backgroundColor: '#25D366',
                      borderColor: '#25D366',
                      boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                      gap: '10px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20BA5A'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.351.226-.652.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.633-.929-2.237-.245-.588-.493-.508-.678-.518-.176-.009-.376-.011-.577-.011-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.911 1.229 3.112c.15.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.722.23 1.379.197 1.9.119.58-.088 1.78-.727 2.031-1.429.251-.702.251-1.304.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.839.497 3.565 1.364 5.062L2 22l5.067-1.328a9.96 9.96 0 0 0 4.973 1.34h.004c5.524 0 10.012-4.488 10.012-10.012A9.97 9.97 0 0 0 12.04 2zm0 18.288h-.003a8.27 8.27 0 0 1-4.218-1.157l-.302-.18-3.136.822.837-3.057-.197-.314a8.267 8.267 0 0 1-1.267-4.39c0-4.57 3.719-8.289 8.289-8.289a8.26 8.26 0 0 1 5.861 2.428 8.26 8.26 0 0 1 2.428 5.861c0 4.571-3.719 8.289-8.289 8.289z" />
                    </svg>
                    SEND REQUIREMENT
                  </button>

                  <a
                    href={`tel:${BUSINESS_DATA.phone}`}
                    className="btn btn-secondary"
                  >
                    Call Kamlesh Bhai Directly
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

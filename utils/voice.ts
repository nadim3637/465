
import { useState, useEffect, useCallback } from 'react';

class VoiceManager {
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.synthesis = window.speechSynthesis;
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
    this.loadVoices();
  }

  private loadVoices() {
    this.voices = this.synthesis.getVoices();
  }

  public getIndianVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0) this.loadVoices();
    return this.voices.filter(v => 
      v.lang.includes('IN') || 
      v.name.includes('India') || 
      v.name.includes('Hindi') ||
      v.lang === 'hi-IN' || 
      v.lang === 'en-IN'
    );
  }

  public getAllVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0) this.loadVoices();
    return this.voices;
  }

  public speak(text: string, voiceURI?: string, rate: number = 1.0) {
    this.stop();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;

    // Auto-detect Hindi char range
    const isHindi = /[\u0900-\u097F]/.test(text);
    
    if (voiceURI) {
        const selected = this.voices.find(v => v.voiceURI === voiceURI);
        if (selected) utterance.voice = selected;
    } else if (isHindi) {
        // Auto-select Hindi voice if not specified
        const hindiVoice = this.getIndianVoices().find(v => v.lang.includes('hi'));
        if (hindiVoice) utterance.voice = hindiVoice;
    }

    this.synthesis.speak(utterance);
  }

  public stop() {
    this.synthesis.cancel();
  }
}

export const voiceManager = new VoiceManager();

export const useVoice = () => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    
    useEffect(() => {
        setVoices(voiceManager.getIndianVoices());
        
        const handleChange = () => {
            setVoices(voiceManager.getIndianVoices());
        };
        
        window.speechSynthesis.addEventListener('voiceschanged', handleChange);
        return () => window.speechSynthesis.removeEventListener('voiceschanged', handleChange);
    }, []);

    const speak = useCallback((text: string, voiceURI?: string) => {
        voiceManager.speak(text, voiceURI);
    }, []);

    const stop = useCallback(() => {
        voiceManager.stop();
    }, []);

    return { voices, speak, stop };
};

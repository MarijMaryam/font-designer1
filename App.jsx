
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import FontPreview from '@/components/FontPreview';
import FontLibrary from '@/components/FontLibrary';
import StyleControls from '@/components/StyleControls';
import DesignSuggestions from '@/components/DesignSuggestions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';

function App() {
  const [text, setText] = useState('Font Designs');
  const [selectedFont, setSelectedFont] = useState('Inter, sans-serif');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState(600);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textAlign, setTextAlign] = useState('center');
  const [color, setColor] = useState('#ffffff');
  const [effect, setEffect] = useState('none');

  const handleApplySuggestion = (style) => {
    setSelectedFont(style.fontFamily);
    setFontSize(style.fontSize);
    setFontWeight(style.fontWeight);
    setLetterSpacing(style.letterSpacing);
    setEffect(style.effect);
    setColor(style.color);
  };

  const handleCopyText = async () => {
    if (!text.trim()) {
      toast({
        title: "⚠️ No Text to Copy",
        description: "Please enter some text first!",
      });
      return;
    }

    try {
      // Create a temporary element with the styled text
      const tempElement = document.createElement('div');
      tempElement.style.fontFamily = selectedFont;
      tempElement.style.fontSize = `${fontSize}px`;
      tempElement.style.fontWeight = fontWeight;
      tempElement.style.letterSpacing = `${letterSpacing}px`;
      tempElement.style.lineHeight = lineHeight;
      tempElement.style.color = color;
      tempElement.textContent = text;
      
      // Copy the text to clipboard
      await navigator.clipboard.writeText(text);
      
      toast({
        title: "✅ Text Copied!",
        description: `"${text}" copied with ${selectedFont.split(',')[0]} font style applied!`,
      });
    } catch (err) {
      toast({
        title: "❌ Copy Failed",
        description: "Unable to copy text. Please try again.",
      });
    }
  };

  const handleCopyCSS = async () => {
    const getEffectCSS = () => {
      switch (effect) {
        case 'shadow': return 'text-shadow: 0 0 10px currentColor;';
        case 'outline': return '-webkit-text-stroke: 2px currentColor; -webkit-text-fill-color: transparent;';
        case 'gradient': return 'background: linear-gradient(135deg, #a855f7, #ec4899, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;';
        case '3d': return 'text-shadow: 1px 1px 0 #333, 2px 2px 0 #333, 3px 3px 0 #333, 4px 4px 0 #333, 5px 5px 10px rgba(0,0,0,0.5);';
        case 'neon': return 'color: #fff; text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px #a855f7, 0 0 35px #a855f7, 0 0 40px #a855f7;';
        case 'retro': return 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7); background-size: 400% 400%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: gradient 3s ease infinite;';
        case 'glitch': return 'position: relative; animation: glitch 2s infinite;';
        default: return '';
      }
    };

    const cssCode = `
.styled-text {
  font-family: ${selectedFont};
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  letter-spacing: ${letterSpacing}px;
  line-height: ${lineHeight};
  text-align: ${textAlign};
  color: ${effect === 'gradient' || effect === 'retro' ? 'transparent' : color};
  ${getEffectCSS()}
}`;

    try {
      await navigator.clipboard.writeText(cssCode);
      toast({
        title: "✅ CSS Copied!",
        description: "CSS styles copied to clipboard successfully!",
      });
    } catch (err) {
      toast({
        title: "❌ Copy Failed",
        description: "Unable to copy CSS. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Animated Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 floating"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.span
              className="inline-block gradient-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Font Designs
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transform your text with stunning typography. Explore fonts, apply effects, and create amazing designs.
          </motion.p>
        </motion.header>

        {/* Enhanced Text Input with Copy Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your text here..."
              className="text-lg h-14 glass-effect border-purple-500/30 focus:border-purple-500 text-center pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button
                onClick={handleCopyText}
                size="sm"
                variant="outline"
                className="effect-button h-10"
                title="Copy text with current font style"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleCopyCSS}
                size="sm"
                variant="outline"
                className="effect-button h-10"
                title="Copy CSS styles"
              >
                CSS
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="h-96 mb-6">
              <FontPreview
                text={text}
                fontFamily={selectedFont}
                fontSize={fontSize}
                fontWeight={fontWeight}
                letterSpacing={letterSpacing}
                lineHeight={lineHeight}
                textAlign={textAlign}
                color={color}
                effect={effect}
              />
            </div>

            {/* Design Suggestions */}
            <DesignSuggestions onApplySuggestion={handleApplySuggestion} />
          </motion.div>

          {/* Controls Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <Tabs defaultValue="fonts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fonts">Fonts</TabsTrigger>
                <TabsTrigger value="styles">Styles</TabsTrigger>
              </TabsList>

              <TabsContent value="fonts" className="mt-6">
                <div className="glass-effect rounded-xl p-6 pulse-glow">
                  <h3 className="text-lg font-semibold mb-4 gradient-text">Font Library</h3>
                  <FontLibrary
                    selectedFont={selectedFont}
                    onFontSelect={setSelectedFont}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                  />
                </div>
              </TabsContent>

              <TabsContent value="styles" className="mt-6">
                <div className="glass-effect rounded-xl p-6 pulse-glow">
                  <h3 className="text-lg font-semibold mb-4 gradient-text">Style Controls</h3>
                  <StyleControls
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    fontWeight={fontWeight}
                    setFontWeight={setFontWeight}
                    letterSpacing={letterSpacing}
                    setLetterSpacing={setLetterSpacing}
                    lineHeight={lineHeight}
                    setLineHeight={setLineHeight}
                    textAlign={textAlign}
                    setTextAlign={setTextAlign}
                    color={color}
                    setColor={setColor}
                    effect={effect}
                    setEffect={setEffect}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 py-8 border-t border-purple-500/20"
        >
          <p className="text-muted-foreground">
            Created with ❤️ using React, Tailwind CSS, and Framer Motion
          </p>
        </motion.footer>
      </div>

      <Toaster />
    </div>
  );
}

export default App;

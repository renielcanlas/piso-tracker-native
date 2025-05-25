import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, IconButton, Modal, Portal, SegmentedButtons } from 'react-native-paper';
import { themeColors } from './themeColors';

type AvatarModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onSave: (icon: string, color: string) => void;
  initialIcon?: string;
  initialColor?: string;
};

const COLORS = [
  // Vibrant Colors
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4',
  '#717EC3', '#FFA62B', '#C06C84', '#F8B195', '#89C4F4',
  // Material Colors
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  // Pastel Colors
  '#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFB3F7',
  '#E0BBE4', '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3',
  // Neutral Colors
  '#607D8B', '#795548', '#9E9E9E', '#455A64', '#333333'
];

const ICONS = [
  // People & Faces
  'account', 'account-circle', 'account-tie', 'account-star', 'account-heart',
  'face-man', 'face-woman', 'face-agent', 'alien', 'emoticon', 'emoticon-cool',
  'emoticon-happy', 'emoticon-wink', 'incognito',
  // Animals
  'bee', 'bird', 'butterfly', 'cat', 'cow', 'dog', 'dolphin', 'duck',
  'elephant', 'fish', 'owl', 'panda', 'penguin', 'pig', 'rabbit', 'sheep',
  // Nature & Weather
  'flower', 'flower-tulip', 'leaf', 'mushroom', 'tree', 'pine-tree',
  'weather-sunny', 'weather-night', 'star', 'star-shooting', 'moon-full',
  // Objects & Symbols
  'airplane', 'bag-personal', 'balloon', 'book', 'camera', 'cards-heart',
  'coffee', 'cookie', 'crown', 'cup', 'dice-multiple', 'food-apple',
  'gamepad', 'gift', 'heart', 'hexagon', 'key', 'lightning-bolt',
  'medal', 'music', 'palette', 'pizza', 'rocket', 'shield', 'sword',
  // Tech & Brands
  'android', 'apple', 'github', 'google', 'microsoft', 'robot', 'twitter',
  'youtube', 'instagram', 'facebook', 'linkedin'
];

export default function AvatarModal({ visible, onDismiss, onSave, initialIcon = 'account', initialColor = COLORS[0] }: AvatarModalProps) {
  const [activeTab, setActiveTab] = React.useState('icon');
  const [selectedIcon, setSelectedIcon] = React.useState(initialIcon);
  const [selectedColor, setSelectedColor] = React.useState(initialColor);  const handleSave = () => {
    onSave(selectedIcon, selectedColor);
    onDismiss();
  };

  // Reset selections when modal opens
  React.useEffect(() => {
    if (visible) {
      setSelectedIcon(initialIcon);
      setSelectedColor(initialColor);
    }
  }, [visible, initialIcon, initialColor]);

  const IconPicker = () => (
    <ScrollView>
      <View style={styles.gridContainer}>
        {ICONS.map((icon) => (
          <IconButton
            key={icon}
            icon={icon}
            size={40}
            mode={selectedIcon === icon ? 'contained' : 'outlined'}
            selected={selectedIcon === icon}
            onPress={() => setSelectedIcon(icon)}
            style={styles.iconButton}
          />
        ))}
      </View>
    </ScrollView>
  );

  const ColorPicker = () => (
    <ScrollView>
      <View style={styles.gridContainer}>
        {COLORS.map((color) => (
          <IconButton
            key={color}
            icon={selectedIcon}
            size={40}
            mode={selectedColor === color ? 'contained' : 'outlined'}
            selected={selectedColor === color}
            onPress={() => setSelectedColor(color)}
            style={[styles.colorButton, { backgroundColor: color }]}
            iconColor={selectedColor === color ? 'white' : color}
          />
        ))}
      </View>
    </ScrollView>
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.previewContainer}>
          <Avatar.Icon 
            size={80} 
            icon={selectedIcon}
            style={{ backgroundColor: selectedColor }}
          />
        </View>
        <SegmentedButtons
          value={activeTab}
          onValueChange={setActiveTab}
          buttons={[
            { value: 'icon', label: 'Icon' },
            { value: 'color', label: 'Color' },
          ]}
          style={styles.segmentedButtons}
        />
        <View style={styles.content}>
          {activeTab === 'icon' ? <IconPicker /> : <ColorPicker />}
        </View>
        <View style={styles.actions}>
          <Button 
            mode="outlined" 
            onPress={onDismiss}
            style={styles.button}
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSave}
            style={[styles.button, styles.saveButton]}
          >
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  content: {
    height: 300,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  iconButton: {
    margin: 4,
  },
  colorButton: {
    margin: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: themeColors.primaryBlue,
  }
});

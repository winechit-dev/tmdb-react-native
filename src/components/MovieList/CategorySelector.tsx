import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { MOVIE_CATEGORIES } from '../../constants';
import { MovieCategory } from '../../hooks';
import Chip from '../Chip';

interface CategorySelectorProps {
  currentCategory: MovieCategory;
  onCategoryPress: (category: Exclude<MovieCategory, 'search'>) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  currentCategory,
  onCategoryPress,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.container}
    contentContainerStyle={styles.content}
  >
    {MOVIE_CATEGORIES.map((category) => (
      <Chip
        key={category.key}
        title={category.title}
        isSelected={currentCategory === category.key}
        onPress={() => onCategoryPress(category.key)}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
  content: {
    paddingHorizontal: 15,
  },
});

export default CategorySelector;

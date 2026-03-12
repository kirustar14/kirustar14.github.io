/**
 * AR Service - Handles augmented reality overlay calculations
 * This service calculates where to overlay previous capture images
 * based on anchor point alignment
 */

export const arService = {
  /**
   * Calculate transformation matrix for overlay
   * @param {Object} currentAnchor - Current photo's anchor point {x, y}
   * @param {Object} referenceAnchor - Reference capture's anchor point {x, y}
   * @param {Object} currentDimensions - Current photo dimensions {width, height}
   * @param {Object} referenceDimensions - Reference photo dimensions {width, height}
   * @returns {Object} Transformation data for overlay
   */
  calculateOverlayTransform(currentAnchor, referenceAnchor, currentDimensions, referenceDimensions) {
    // Calculate the offset between anchor points
    const offsetX = (currentAnchor.x - referenceAnchor.x) * currentDimensions.width;
    const offsetY = (currentAnchor.y - referenceAnchor.y) * currentDimensions.height;
    
    // Calculate scale factor (assuming same camera distance)
    const scaleX = currentDimensions.width / referenceDimensions.width;
    const scaleY = currentDimensions.height / referenceDimensions.height;
    
    return {
      translateX: offsetX,
      translateY: offsetY,
      scaleX,
      scaleY,
      opacity: 0.7 // Semi-transparent overlay
    };
  },

  /**
   * Segment image into potential anchor point grid
   * @param {Object} imageDimensions - {width, height}
   * @param {number} gridSize - Number of grid cells per dimension
   * @returns {Array} Array of anchor point suggestions
   */
  generateAnchorPointGrid(imageDimensions, gridSize = 3) {
    const anchorPoints = [];
    const cellWidth = 1 / gridSize;
    const cellHeight = 1 / gridSize;
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        anchorPoints.push({
          id: `anchor_${row}_${col}`,
          x: (col + 0.5) * cellWidth, // Center of cell
          y: (row + 0.5) * cellHeight,
          label: `Point ${row * gridSize + col + 1}`
        });
      }
    }
    
    return anchorPoints;
  },

  /**
   * Generate edge-based anchor points (corners and edges)
   * These are typically more stable landmarks
   */
  generateEdgeAnchorPoints() {
    return [
      // Corners
      { id: 'top_left', x: 0.1, y: 0.1, label: 'Top Left Corner' },
      { id: 'top_right', x: 0.9, y: 0.1, label: 'Top Right Corner' },
      { id: 'bottom_left', x: 0.1, y: 0.9, label: 'Bottom Left Corner' },
      { id: 'bottom_right', x: 0.9, y: 0.9, label: 'Bottom Right Corner' },
      
      // Edge midpoints
      { id: 'top_mid', x: 0.5, y: 0.1, label: 'Top Edge' },
      { id: 'bottom_mid', x: 0.5, y: 0.9, label: 'Bottom Edge' },
      { id: 'left_mid', x: 0.1, y: 0.5, label: 'Left Edge' },
      { id: 'right_mid', x: 0.9, y: 0.5, label: 'Right Edge' },
      
      // Center
      { id: 'center', x: 0.5, y: 0.5, label: 'Center' }
    ];
  },

  /**
   * Calculate alignment score between two images based on anchor points
   * @returns {number} Score from 0-100 indicating alignment quality
   */
  calculateAlignmentScore(anchorPoint1, anchorPoint2) {
    const dx = Math.abs(anchorPoint1.x - anchorPoint2.x);
    const dy = Math.abs(anchorPoint1.y - anchorPoint2.y);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Convert distance to score (closer = better)
    const score = Math.max(0, 100 - (distance * 100));
    return Math.round(score);
  },

  /**
   * Detect if anchor point is likely stable (on structural element)
   * This is a placeholder - could be enhanced with AI/CV
   */
  assessAnchorStability(anchorPoint) {
    // Edge points are generally more stable
    const isEdge = anchorPoint.x < 0.2 || anchorPoint.x > 0.8 || 
                   anchorPoint.y < 0.2 || anchorPoint.y > 0.8;
    
    return {
      isStable: isEdge,
      confidence: isEdge ? 'high' : 'medium',
      recommendation: isEdge ? 
        'Good choice - edge features are stable' : 
        'Consider choosing an edge or corner for better stability'
    };
  }
};

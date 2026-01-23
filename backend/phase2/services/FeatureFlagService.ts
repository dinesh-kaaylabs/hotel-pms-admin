/**
 * Phase-2 Feature Flag Service
 * 
 * Manages feature flags for Phase-2 modules.
 * Feature flags are stored per-hotel and can be toggled independently.
 * 
 * IMPORTANT: All Phase-2 features must check feature flags before execution.
 */

// ============================================================================
// FEATURE FLAG NAMES
// ============================================================================

export enum Phase2FeatureFlag {
  // Communication Automation Flags
  COMMUNICATION_EMAIL_ENABLED = 'COMMUNICATION_EMAIL_ENABLED',
  COMMUNICATION_SMS_ENABLED = 'COMMUNICATION_SMS_ENABLED',
  COMMUNICATION_WHATSAPP_ENABLED = 'COMMUNICATION_WHATSAPP_ENABLED',
  COMMUNICATION_TEMPLATES_ENABLED = 'COMMUNICATION_TEMPLATES_ENABLED',
  COMMUNICATION_AUTOMATION_ENABLED = 'COMMUNICATION_AUTOMATION_ENABLED',
  COMMUNICATION_LOGS_ENABLED = 'COMMUNICATION_LOGS_ENABLED',
  
  // Audit Logs Flags
  AUDIT_LOGS_ENABLED = 'AUDIT_LOGS_ENABLED',
  
  // Approval Workflows Flags
  APPROVAL_WORKFLOWS_ENABLED = 'APPROVAL_WORKFLOWS_ENABLED',
}

// ============================================================================
// FEATURE FLAG CONFIGURATION
// ============================================================================

export interface FeatureFlagConfig {
  flag: Phase2FeatureFlag;
  defaultValue: boolean;
  description: string;
  module: string;
}

export const FEATURE_FLAG_CONFIGS: Record<Phase2FeatureFlag, FeatureFlagConfig> = {
  [Phase2FeatureFlag.COMMUNICATION_EMAIL_ENABLED]: {
    flag: Phase2FeatureFlag.COMMUNICATION_EMAIL_ENABLED,
    defaultValue: false,
    description: 'Enable email automation (automated email sending)',
    module: 'Communication Automation',
  },
  [Phase2FeatureFlag.COMMUNICATION_SMS_ENABLED]: {
    flag: Phase2FeatureFlag.COMMUNICATION_SMS_ENABLED,
    defaultValue: false,
    description: 'Enable SMS automation (automated SMS sending)',
    module: 'Communication Automation',
  },
  [Phase2FeatureFlag.COMMUNICATION_WHATSAPP_ENABLED]: {
    flag: Phase2FeatureFlag.COMMUNICATION_WHATSAPP_ENABLED,
    defaultValue: false,
    description: 'Enable WhatsApp automation (automated WhatsApp messaging)',
    module: 'Communication Automation',
  },
  [Phase2FeatureFlag.COMMUNICATION_TEMPLATES_ENABLED]: {
    flag: Phase2FeatureFlag.COMMUNICATION_TEMPLATES_ENABLED,
    defaultValue: false,
    description: 'Enable template management UI',
    module: 'Communication Automation',
  },
  [Phase2FeatureFlag.COMMUNICATION_AUTOMATION_ENABLED]: {
    flag: Phase2FeatureFlag.COMMUNICATION_AUTOMATION_ENABLED,
    defaultValue: false,
    description: 'Enable event-driven communication automation',
    module: 'Communication Automation',
  },
  [Phase2FeatureFlag.COMMUNICATION_LOGS_ENABLED]: {
    flag: Phase2FeatureFlag.COMMUNICATION_LOGS_ENABLED,
    defaultValue: false,
    description: 'Enable communication log viewer UI',
    module: 'Communication Automation',
  },
  [Phase2FeatureFlag.AUDIT_LOGS_ENABLED]: {
    flag: Phase2FeatureFlag.AUDIT_LOGS_ENABLED,
    defaultValue: false,
    description: 'Enable audit log system (logging and viewer)',
    module: 'Audit Logs & Approval Workflows',
  },
  [Phase2FeatureFlag.APPROVAL_WORKFLOWS_ENABLED]: {
    flag: Phase2FeatureFlag.APPROVAL_WORKFLOWS_ENABLED,
    defaultValue: false,
    description: 'Enable approval workflow system',
    module: 'Audit Logs & Approval Workflows',
  },
};

// ============================================================================
// FEATURE FLAG SERVICE
// ============================================================================

export interface HotelFeatureFlags {
  hotelId: string;
  flags: Record<Phase2FeatureFlag, boolean>;
  updatedAt: string;
  updatedBy?: string;
}

/**
 * Feature Flag Service
 * 
 * Manages feature flags per hotel.
 * Flags are fetched from backend and cached in memory.
 */
export class FeatureFlagService {
  private cache: Map<string, HotelFeatureFlags> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Check if a feature flag is enabled for a hotel
   * @param hotelId The hotel ID
   * @param flag The feature flag to check
   * @returns true if enabled, false otherwise
   */
  async isEnabled(hotelId: string, flag: Phase2FeatureFlag): Promise<boolean> {
    const config = FEATURE_FLAG_CONFIGS[flag];
    if (!config) {
      console.warn(`Unknown feature flag: ${flag}`);
      return false;
    }

    // Check cache first
    const cached = this.getCachedFlags(hotelId);
    if (cached) {
      return cached.flags[flag] ?? config.defaultValue;
    }

    // Fetch from backend (would be implemented with actual API call)
    // For now, return default value
    return config.defaultValue;
  }

  /**
   * Get all feature flags for a hotel
   * @param hotelId The hotel ID
   * @returns Hotel feature flags
   */
  async getFlags(hotelId: string): Promise<HotelFeatureFlags> {
    const cached = this.getCachedFlags(hotelId);
    if (cached) {
      return cached;
    }

    // Fetch from backend (would be implemented with actual API call)
    // For now, return default flags
    return this.getDefaultFlags(hotelId);
  }

  /**
   * Update feature flags for a hotel
   * @param hotelId The hotel ID
   * @param flags Flags to update
   * @param updatedBy User ID who made the change
   */
  async updateFlags(
    hotelId: string,
    flags: Partial<Record<Phase2FeatureFlag, boolean>>,
    updatedBy?: string
  ): Promise<void> {
    // Update backend (would be implemented with actual API call)
    // For now, update cache
    const current = await this.getFlags(hotelId);
    const updated: HotelFeatureFlags = {
      ...current,
      flags: {
        ...current.flags,
        ...flags,
      },
      updatedAt: new Date().toISOString(),
      updatedBy,
    };

    this.cache.set(hotelId, updated);
    this.cacheExpiry.set(hotelId, Date.now() + this.CACHE_TTL);
  }

  /**
   * Get cached flags (if not expired)
   */
  private getCachedFlags(hotelId: string): HotelFeatureFlags | null {
    const cached = this.cache.get(hotelId);
    const expiry = this.cacheExpiry.get(hotelId);

    if (cached && expiry && Date.now() < expiry) {
      return cached;
    }

    // Cache expired or not found
    if (cached) {
      this.cache.delete(hotelId);
      this.cacheExpiry.delete(hotelId);
    }

    return null;
  }

  /**
   * Get default flags for a hotel
   */
  private getDefaultFlags(hotelId: string): HotelFeatureFlags {
    const flags: Record<Phase2FeatureFlag, boolean> = {} as Record<
      Phase2FeatureFlag,
      boolean
    >;

    for (const [flag, config] of Object.entries(FEATURE_FLAG_CONFIGS)) {
      flags[flag as Phase2FeatureFlag] = config.defaultValue;
    }

    return {
      hotelId,
      flags,
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Clear cache for a hotel
   */
  clearCache(hotelId: string): void {
    this.cache.delete(hotelId);
    this.cacheExpiry.delete(hotelId);
  }

  /**
   * Clear all cache
   */
  clearAllCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const featureFlagService = new FeatureFlagService();

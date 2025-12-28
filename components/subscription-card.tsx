"use client"

import { Card } from "@/components/ui/card"
import { Clock, CheckCircle, Calendar, AlertCircle, TrendingUp } from "lucide-react"

interface SubscriptionCardProps {
  subscription: {
    start_date: string
    end_date: string
    days_remaining: number
    is_active: boolean
  }
  pricing_plan?: {
    plan_name: string
    plan_type: string
    price_usd: number
    hits_per_day: number
    user_limit: number
    features: {
      has_community: boolean
      has_live_data: boolean
      has_code_base: boolean
      has_multi_sensor: boolean
    }
    description: string
  }
  user_limits?: {
    total_slots: number
    used_slots: number
    available_slots: number
    can_accept_students: boolean
  }
}

export function SubscriptionCard({ subscription, pricing_plan, user_limits }: SubscriptionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusColor = () => {
    if (!subscription.is_active) return "bg-red-500/20 text-red-500"
    if (subscription.days_remaining <= 7) return "bg-yellow-500/20 text-yellow-500"
    if (subscription.days_remaining <= 30) return "bg-orange-500/20 text-orange-500"
    return "bg-primary/20 text-primary"
  }

  const getStatusText = () => {
    if (!subscription.is_active) return "Inactive"
    if (subscription.days_remaining <= 7) return "Expiring Soon"
    if (subscription.days_remaining <= 30) return "Renewal Due"
    return "Active"
  }

  const daysPercentage = Math.min((subscription.days_remaining / 365) * 100, 100)

  return (
    <Card className="bg-card border border-border p-4 sm:p-6 rounded-xl hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">Subscription Status</h3>
            {pricing_plan && (
              <p className="text-sm text-muted-foreground mt-1">{pricing_plan.plan_name}</p>
            )}
          </div>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getStatusColor()}`}>
            <CheckCircle size={20} />
          </div>
        </div>

        {/* Pricing Info */}
        {pricing_plan && (
          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              ${pricing_plan.price_usd.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
        )}

        {/* Dates Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar size={12} />
              Start Date
            </p>
            <p className="text-sm font-bold text-foreground">{formatDate(subscription.start_date)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar size={12} />
              End Date
            </p>
            <p className="text-sm font-bold text-foreground">{formatDate(subscription.end_date)}</p>
          </div>
        </div>

        {/* Days Remaining with Progress */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <Clock size={18} className="text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Days Remaining</p>
              <p className="text-lg sm:text-xl font-bold text-primary">{subscription.days_remaining} days</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${subscription.days_remaining <= 7 ? 'bg-red-500' : subscription.days_remaining <= 30 ? 'bg-yellow-500' : 'bg-primary'}`}
              style={{ width: `${daysPercentage}%` }}
            />
          </div>
        </div>

        {/* User Limits (if provided) */}
        {user_limits && (
          <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <TrendingUp size={18} className="text-blue-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Student Slots</p>
              <p className="text-sm font-bold text-foreground">
                {user_limits.used_slots} / {user_limits.total_slots} used
              </p>
              <p className="text-xs text-blue-500 mt-1">{user_limits.available_slots} slots available</p>
            </div>
          </div>
        )}

        {/* Plan Features (if provided) */}
        {pricing_plan && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Plan Features</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Community", value: pricing_plan.features.has_community },
                { label: "Live Data", value: pricing_plan.features.has_live_data },
                { label: "Code Base", value: pricing_plan.features.has_code_base },
                { label: "Multi Sensor", value: pricing_plan.features.has_multi_sensor },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${feature.value ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className={`text-xs ${feature.value ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Limits */}
        {pricing_plan && (
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-muted-foreground">Daily Hit Limit</span>
            <span className="font-bold text-foreground">{pricing_plan.hits_per_day.toLocaleString()}</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="flex items-center justify-between pt-2">
          <p className={`text-xs sm:text-sm font-semibold inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${getStatusColor()}`}>
            {subscription.is_active ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
            {getStatusText()}
          </p>
          
          {subscription.days_remaining <= 30 && subscription.is_active && (
            <button className="text-xs font-semibold text-primary hover:underline">
              Renew Now
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}
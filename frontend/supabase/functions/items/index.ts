import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const { dc, day, meal } = await req.json()

    if (!dc || !day || !meal) {
      throw new Error('Please enter valid parameters')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data, error } = await supabaseClient
      .from('current_menu')
      .select(`*, common_items ( * )`)
      .eq('dc', dc)
      .eq('day', day)
      .eq('meal', meal)

    if (error) throw error

    return new Response(
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: error.message === 'Please enter valid parameters' ? 400 : 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
})
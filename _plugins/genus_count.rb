module Jekyll
    class GenusCountTag < Liquid::Tag
      def render(context)
        context.registers[:site].pages.count { |page| page.data["Genus"] }
      end
    end
  end
  
  Liquid::Template.register_tag('genus_count', Jekyll::GenusCountTag)  